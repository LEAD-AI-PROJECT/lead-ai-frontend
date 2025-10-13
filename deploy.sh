\
#!/usr/bin/env bash
# Deploy Next.js on Ubuntu 24.04 with PM2 + Nginx + Let's Encrypt
# - Installs Node.js 20 LTS, PM2, Nginx, Certbot
# - Sets up /var/www/<app> with releases/ + current symlink
# - Builds the app and runs it via PM2 (autostart on reboot)
# - Obtains HTTPS with Certbot (nginx plugin)
#
# USAGE:
#   1) Edit "CONFIG" below.
#   2) sudo bash deploy_next_pm2_ubuntu24.sh
#
# Re-running this script will perform a new release, switch the 'current' symlink,
# and reload the PM2 process.
set -euo pipefail

# ---------------------------
# CONFIG — EDIT ME
# ---------------------------
APP_NAME="landing-page"
DOMAIN="aileadyou.com"
REPO_URL="git@github.com:AI-Lead-You/lead-ai-frontend.git"
REPO_BRANCH="main"
APP_PORT="3000"
NODE_MAJOR="22"
APP_USER="deploy"
APP_DIR="/home/deploy/apps/${APP_NAME}"
RELEASES_DIR="${APP_DIR}/releases"
CURRENT_LINK="${APP_DIR}/current"
SHARED_DIR="${APP_DIR}/shared"
ENV_FILE="${SHARED_DIR}/.env"
ECOSYSTEM_FILE="${APP_DIR}/ecosystem.config.js"
PM2_APP_NAME="next-${APP_NAME}"
# ---------------------------

TIMESTAMP="$(date +%Y%m%d%H%M%S)"
NEW_RELEASE="${RELEASES_DIR}/${TIMESTAMP}"

log() { echo -e "\\033[1;32m==>\\033[0m $*"; }
warn() { echo -e "\\033[1;33m[!]\\033[0m $*"; }
die() { echo -e "\\033[1;31m[✗]\\033[0m $*"; exit 1; }

require_root() {
  if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
    die "Please run as root: sudo bash $0"
  fi
}

apt_install() {
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends "$@"
}

ensure_user() {
  if id -u "$APP_USER" >/dev/null 2>&1; then
    log "User $APP_USER exists."
  else
    log "Creating system user $APP_USER (no shell login)."
    adduser --system --ingroup www-data --home "$APP_DIR" --no-create-home "$APP_USER"
  fi
}

setup_dirs() {
  mkdir -p "$RELEASES_DIR" "$SHARED_DIR"
  chown -R "$APP_USER":"www-data" "$APP_DIR"
}

install_basics() {
  log "Updating apt and installing basics..."
  apt-get update -y
  apt_install ca-certificates curl git build-essential
}

install_node_pm2() {
  if command -v node >/dev/null 2>&1 && node -v | grep -qE "^v${NODE_MAJOR}\\."; then
    log "Node.js $(node -v) already installed."
  else
    log "Installing Node.js ${NODE_MAJOR}.x (NodeSource)..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash -
    apt_install nodejs
    log "Node.js $(node -v) installed."
  fi

  if command -v pm2 >/dev/null 2>&1; then
    log "PM2 already installed ($(pm2 -v))."
  else
    log "Installing PM2 globally..."
    npm i -g pm2@latest
  fi

  corepack enable || true
}

install_nginx_certbot() {
  if ! command -v nginx >/dev/null 2>&1; then
    log "Installing Nginx..."
    apt_install nginx
    systemctl enable --now nginx
  else
    log "Nginx already installed."
  fi

  if ! command -v snap >/dev/null 2>&1; then
    log "Installing snapd (for certbot)..."
    apt_install snapd
  fi

  if ! command -v certbot >/dev/null 2>&1; then
    log "Installing certbot via snap..."
    snap install core || true
    snap refresh core || true
    snap install --classic certbot
    ln -sf /snap/bin/certbot /usr/bin/certbot
  else
    log "Certbot already installed."
  fi
}

configure_firewall() {
  if command -v ufw >/dev/null 2>&1; then
    warn "UFW detected; setting rules (will not enable ufw if disabled)."
    ufw allow OpenSSH || true
    ufw allow 'Nginx Full' || true
  fi
}

clone_build_release() {
  log "Cloning ${REPO_URL} (${REPO_BRANCH})..."
  sudo -u "$APP_USER" git clone --branch "$REPO_BRANCH" --depth 1 "$REPO_URL" "$NEW_RELEASE"
  pushd "$NEW_RELEASE" >/dev/null

  if [[ ! -f package.json ]]; then
    die "package.json not found in repo root."
  fi

  log "Installing dependencies with npm ci..."
  sudo -u "$APP_USER" npm ci

  log "Building Next.js app..."
  if [[ -f "$ENV_FILE" ]]; then
    # export vars during build without persisting globally
    set -a
    # shellcheck disable=SC1090
    source "$ENV_FILE"
    set +a
  fi
  sudo -u "$APP_USER" npm run build

  popd >/dev/null

  log "Linking current -> ${NEW_RELEASE}"
  ln -sfn "$NEW_RELEASE" "$CURRENT_LINK"
  chown -h "$APP_USER":"www-data" "$CURRENT_LINK"
}

write_env_file() {
  if [[ -f "$ENV_FILE" ]]; then
    log "ENV file exists at ${ENV_FILE}"
  else
    warn "Creating ${ENV_FILE}. Add your production env vars after this run."
    cat > "$ENV_FILE" <<'EOF'
# Example production env vars (edit/remove as needed)
NODE_ENV=production
#NEXTAUTH_URL=https://example.com
#DATABASE_URL=postgres://user:pass@host:5432/db
#NEXT_PUBLIC_API_BASE=https://api.example.com
EOF
    chown "$APP_USER":"www-data" "$ENV_FILE"
    chmod 640 "$ENV_FILE"
  fi
}

write_start_wrapper() {
  local wrapper="${SHARED_DIR}/start.sh"
  log "Writing start wrapper ${wrapper} (sources .env, runs 'npm run start')."
  cat > "$wrapper" <<EOF
#!/usr/bin/env bash
set -euo pipefail
APP_PORT="${APP_PORT}"
ENV_FILE="${ENV_FILE}"
# Export env vars from .env for this process
if [[ -f "\$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "\$ENV_FILE"
  set +a
fi
exec npm run start -- -p "\${APP_PORT}"
EOF
  chown "$APP_USER":"www-data" "$wrapper"
  chmod 750 "$wrapper"
}

write_ecosystem() {
  if [[ -f "$ECOSYSTEM_FILE" ]]; then
    log "ecosystem.config.js exists at ${ECOSYSTEM_FILE}"
  else
    log "Writing PM2 ecosystem at ${ECOSYSTEM_FILE}"
    cat > "$ECOSYSTEM_FILE" <<EOF
module.exports = {
  apps: [
    {
      name: "${PM2_APP_NAME}",
      cwd: "${CURRENT_LINK}",
      script: "${SHARED_DIR}/start.sh",
      exec_mode: "fork",         // use "cluster" and set instances if you want multi-process
      instances: 1,              // set to "max" for all cores (ensure your app is stateless)
      env: {
        NODE_ENV: "production",
        PORT: "${APP_PORT}"
      },
      watch: false,
      max_memory_restart: "512M",
      out_file: "${APP_DIR}/logs/out.log",
      error_file: "${APP_DIR}/logs/err.log",
      time: true
    }
  ]
}
EOF
    mkdir -p "${APP_DIR}/logs"
    chown -R "$APP_USER":"www-data" "$APP_DIR"
  fi
}

pm2_start_enable() {
  log "Starting app with PM2 and enabling startup on boot..."
  # Start or reload using ecosystem; PM2 will use cwd=current symlink
  su -s /bin/bash -c "pm2 start ${ECOSYSTEM_FILE} || pm2 reload ${PM2_APP_NAME}" "$APP_USER"
  su -s /bin/bash -c "pm2 save" "$APP_USER"
  pm2 startup systemd -u "$APP_USER" --hp "$APP_DIR" >/tmp/pm2_startup.txt || true
  if [[ -s /tmp/pm2_startup.txt ]]; then
    log "PM2 startup output:"
    cat /tmp/pm2_startup.txt
  fi
}

write_nginx_site() {
  local nginx_site="/etc/nginx/sites-available/${APP_NAME}.conf"
  log "Writing Nginx site ${nginx_site} (HTTP only for now; TLS next)."
  cat > "$nginx_site" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    # Increase proxy buffer sizes for large headers (Next.js)
    proxy_buffer_size   128k;
    proxy_buffers       4 256k;
    proxy_busy_buffers_size 256k;

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Static assets (optional micro-cache)
    location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$ {
        expires 7d;
        access_log off;
        proxy_pass http://127.0.0.1:${APP_PORT};
    }
}
EOF

  ln -sf "$nginx_site" "/etc/nginx/sites-enabled/${APP_NAME}.conf"
  rm -f /etc/nginx/sites-enabled/default || true
  nginx -t
  systemctl reload nginx
}

obtain_tls() {
  log "Obtaining TLS certificate via Let's Encrypt for ${DOMAIN}"
  certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos -m "admin@${DOMAIN}" --redirect || {
    warn "Certbot automatic install failed or needs interaction. You can run 'certbot --nginx -d ${DOMAIN}' manually."
  }
}

post_deploy() {
  log "Post-deploy checks"
  su -s /bin/bash -c "pm2 status" "$APP_USER" || true
  curl -fsS "http://127.0.0.1:${APP_PORT}" >/dev/null && log "Local app responded on ${APP_PORT}."
  log "If the site does not load at https://${DOMAIN}, check:\n  - DNS A record\n  - pm2 logs ${PM2_APP_NAME}\n  - nginx -t && systemctl reload nginx"
}

# ---------------------------
# MAIN
# ---------------------------
require_root
install_basics
ensure_user
setup_dirs
install_node_pm2
install_nginx_certbot
configure_firewall
write_env_file
clone_build_release
write_start_wrapper
write_ecosystem
pm2_start_enable
write_nginx_site
obtain_tls
post_deploy

log "✅ Done. Re-deploy by re-running this script. Rollback: point 'current' to an older release and run: pm2 reload ${PM2_APP_NAME}"
