\
#!/usr/bin/env bash
# Next.js PRODUCTION deploy on Ubuntu 24.04 with PM2 + Nginx + Let's Encrypt
# - Deploys app actions as APP_USER ("deploy"), run this script with sudo
# - Auto-detects lockfile: npm ci / yarn --frozen-lockfile / pnpm i --frozen-lockfile / fallback npm install
# - Layout: /home/deploy/apps/landing-page/{releases,current,shared,logs}
#
# USAGE:
#   sudo bash deploy_next_pm2_prod_aileadyou.sh
set -euo pipefail

# ---------------------------
# CONFIG (filled from your values)
# ---------------------------
APP_NAME="landing-page"
DOMAIN="aileadyou.com"
REPO_URL="git@github.com:LEAD-AI-PROJECT/lead-ai-frontend.git"
REPO_BRANCH="production"
PORT="3000"
NODE_MAJOR="22"
APP_USER="deploy"
APP_GROUP="deploy"
APP_DIR="/home/deploy/apps/${APP_NAME}"
RELEASES_DIR="${APP_DIR}/releases"
CURRENT_LINK="${APP_DIR}/current"
SHARED_DIR="${APP_DIR}/shared"
ENV_FILE="${SHARED_DIR}/.env"
ECOSYSTEM_FILE="${APP_DIR}/ecosystem.config.js"
PM2_APP_NAME="next-${APP_NAME}"
LE_EMAIL="admin@${DOMAIN}" # change if preferred
# ---------------------------

TIMESTAMP="$(date +%Y%m%d%H%M%S)"

logs_dir() { echo "${APP_DIR}/logs"; }
start_wrapper(){ echo "${SHARED_DIR}/start.sh"; }

log()  { echo -e "\\033[1;32m==>\\033[0m $*"; }
warn() { echo -e "\\033[1;33m[!]\\033[0m $*"; }
die()  { echo -e "\\033[1;31m[✗]\\033[0m $*"; exit 1; }

require_root() {
  if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
    die "Please run as root: sudo bash $0"
  fi
}

apt_install() {
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends "$@"
}

install_basics() {
  log "Updating apt and installing basics..."
  apt-get update -y
  apt_install ca-certificates curl git build-essential openssh-client
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
  if su - "${APP_USER}" -c "command -v pm2" >/dev/null 2>&1; then
    log "PM2 already installed for ${APP_USER}."
  else
    log "Installing PM2 globally for ${APP_USER}..."
    su - "${APP_USER}" -c "npm i -g pm2@latest"
  fi
  corepack enable || true
}

ensure_dirs_and_ownership() {
  mkdir -p "${RELEASES_DIR}" "${SHARED_DIR}" "$(logs_dir)"
  chown -R "${APP_USER}:${APP_GROUP}" "${APP_DIR}"
}

prepare_github_known_hosts() {
  # Ensure github.com is in known_hosts for the app user (for git@ clone over SSH)
  su - "${APP_USER}" -c "mkdir -p ~/.ssh && chmod 700 ~/.ssh"
  if ! su - "${APP_USER}" -c "ssh-keygen -F github.com >/dev/null 2>&1"; then
    log "Adding github.com to ${APP_USER}'s known_hosts"
    su - "${APP_USER}" -c "ssh-keyscan -t rsa,ecdsa,ed25519 github.com >> ~/.ssh/known_hosts"
    su - "${APP_USER}" -c "chmod 600 ~/.ssh/known_hosts"
  fi
  # NOTE: Ensure /home/deploy/.ssh/id_rsa (or ed25519) exists and has access to the repo.
}

install_nginx_certbot() {
  if ! command -v nginx >/dev/null 2>&1; then
    log "Installing Nginx..."
    apt_install nginx
    systemctl enable --now nginx
  fi
  if ! command -v snap >/dev/null 2>&1; then
    apt_install snapd
  fi
  if ! command -v certbot >/dev/null 2>&1; then
    snap install core || true
    snap refresh core || true
    snap install --classic certbot
    ln -sf /snap/bin/certbot /usr/bin/certbot
  fi
}

configure_firewall() {
  if command -v ufw >/dev/null 2>&1; then
    ufw allow OpenSSH || true
    ufw allow 'Nginx Full' || true
  fi
}

write_env_file() {
  if [[ -f "${ENV_FILE}" ]]; then
    log "ENV file exists at ${ENV_FILE}"
  else
    log "Creating ${ENV_FILE}. Add your production env vars after this run."
    cat > "${ENV_FILE}" <<EOF
NODE_ENV=production
#NEXTAUTH_URL=https://${DOMAIN}
#DATABASE_URL=postgres://user:pass@host:5432/db
#NEXT_PUBLIC_API_BASE=https://api.aileadyou.com
EOF
    chown "${APP_USER}:${APP_GROUP}" "${ENV_FILE}"
    chmod 640 "${ENV_FILE}"
  fi
}

install_deps_auto() {
  local path="$1"
  if [[ -f "${path}/package-lock.json" ]]; then
    log "Detected package-lock.json -> npm ci"
    su - "${APP_USER}" -c "cd '${path}' && npm ci"
  elif [[ -f "${path}/pnpm-lock.yaml" ]]; then
    log "Detected pnpm-lock.yaml -> pnpm i --frozen-lockfile"
    su - "${APP_USER}" -c "cd '${path}' && corepack enable && pnpm i --frozen-lockfile"
  elif [[ -f "${path}/yarn.lock" ]]; then
    log "Detected yarn.lock -> yarn install --frozen-lockfile"
    su - "${APP_USER}" -c "cd '${path}' && corepack enable && yarn install --frozen-lockfile"
  else
    warn "No lockfile found -> falling back to npm install"
    su - "${APP_USER}" -c "cd '${path}' && npm install --no-audit --no-fund"
  fi
}

clone_build_release() {
  local new_release="${RELEASES_DIR}/${TIMESTAMP}"
  log "Cloning ${REPO_URL} (${REPO_BRANCH}) ..."
  su - "${APP_USER}" -c "git clone --branch '${REPO_BRANCH}' --depth 1 '${REPO_URL}' '${new_release}'"
  if [[ ! -f "${new_release}/package.json" ]]; then
    die "package.json not found in repo root."
  fi

  log "Installing dependencies..."
  install_deps_auto "${new_release}"

  log "Building Next.js app..."
  if [[ -f "${ENV_FILE}" ]]; then
    log "Loading env from ${ENV_FILE} for build as ${APP_USER}"
    su - "${APP_USER}" -c "cd '${new_release}' && set -a && source '${ENV_FILE}' && set +a && npm run build"
  else
    su - "${APP_USER}" -c "cd '${new_release}' && npm run build"
  fi

  log "Linking current -> ${new_release}"
  ln -sfn "${new_release}" "${CURRENT_LINK}"
  chown -h "${APP_USER}:${APP_GROUP}" "${CURRENT_LINK}"
}

write_start_wrapper() {
  local wrapper="$(start_wrapper)"
  log "Writing start wrapper ${wrapper}"
  cat > "$wrapper" <<EOF
#!/usr/bin/env bash
set -euo pipefail
APP_PORT="${PORT}"
ENV_FILE="${ENV_FILE}"
if [[ -f "\$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "\$ENV_FILE"
  set +a
fi
exec npm run start -- -p "\${APP_PORT}"
# For standalone runtimes, swap to:
# exec node .next/standalone/server.js -p "\${APP_PORT}"
EOF
  chown "${APP_USER}:${APP_GROUP}" "$wrapper"
  chmod 750 "$wrapper"
}

write_ecosystem() {
  log "Writing PM2 ecosystem at ${ECOSYSTEM_FILE}"
  cat > "${ECOSYSTEM_FILE}" <<EOF
module.exports = {
  apps: [
    {
      name: "${PM2_APP_NAME}",
      cwd: "${CURRENT_LINK}",
      script: "${SHARED_DIR}/start.sh",
      exec_mode: "fork",
      instances: 1,
      env: { NODE_ENV: "production", PORT: "${PORT}" },
      watch: false,
      max_memory_restart: "512M",
      out_file: "${APP_DIR}/logs/out.log",
      error_file: "${APP_DIR}/logs/err.log",
      time: true
    }
  ]
}
EOF
  mkdir -p "$(logs_dir)"
  chown -R "${APP_USER}:${APP_GROUP}" "${APP_DIR}"
}

pm2_start_enable() {
  log "Starting app with PM2 (as ${APP_USER}) and enabling startup on boot..."
  su - "${APP_USER}" -c "pm2 start '${ECOSYSTEM_FILE}' || pm2 reload ${PM2_APP_NAME}"
  su - "${APP_USER}" -c "pm2 save"
  pm2 startup systemd -u "${APP_USER}" --hp "/home/${APP_USER}" >/tmp/pm2_startup.txt || true
  if [[ -s /tmp/pm2_startup.txt ]]; then
    log "PM2 startup output:"
    cat /tmp/pm2_startup.txt
  fi
}

write_nginx_site() {
  local conf="/etc/nginx/sites-available/${APP_NAME}.conf"
  log "Writing Nginx site ${conf} (HTTP first; TLS next)."
  cat > "$conf" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    proxy_buffer_size   128k;
    proxy_buffers       4 256k;
    proxy_busy_buffers_size 256k;

    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$ {
        expires 7d;
        access_log off;
        proxy_pass http://127.0.0.1:${PORT};
    }
}
EOF
  ln -sf "$conf" "/etc/nginx/sites-enabled/${APP_NAME}.conf"
  rm -f /etc/nginx/sites-enabled/default || true
  nginx -t
  systemctl reload nginx
}

obtain_tls() {
  log "Obtaining TLS certificate via Let's Encrypt for ${DOMAIN}"
  certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos -m "${LE_EMAIL}" --redirect || {
    warn "Certbot automatic install failed or needs interaction. You can run 'certbot --nginx -d ${DOMAIN}' manually."
  }
}

# --- Cleanup old releases (keep last 2)
cleanup_old_releases() {
  log "Cleaning up old releases, keeping only 2 most recent..."
  cd "${RELEASES_DIR}" || return
  ls -1t | tail -n +3 | xargs -r rm -rf || true
}

# Add cleanup call inside post_deploy
post_deploy() {
  log "Post-deploy checks"
  su - "${APP_USER}" -c "pm2 status ${PM2_APP_NAME}" || true
  curl -fsS "http://127.0.0.1:${PORT}" >/dev/null && log "App responded on ${PORT}."
  cleanup_old_releases
  log "If the site does not load at https://${DOMAIN}, check:\\n  - DNS A record\\n  - pm2 logs ${PM2_APP_NAME}\\n  - nginx -t && systemctl reload nginx"
}


# ---------------------------
# MAIN
# ---------------------------
require_root
install_basics
install_node_pm2
ensure_dirs_and_ownership
prepare_github_known_hosts

install_nginx_certbot
configure_firewall

write_env_file
clone_build_release

write_start_wrapper
write_ecosystem
pm2_start_enable

# Nginx & TLS are now managed manually; avoid overwriting existing config
# write_nginx_site
# obtain_tls
cleanup_old_releases
post_deploy


log "✅ Done.
Redeploy: push changes then re-run this script.
Rollback:
  cd ${APP_DIR}
  ls -1 releases
  sudo ln -sfn ${APP_DIR}/releases/<older_timestamp> ${CURRENT_LINK}
  sudo -u ${APP_USER} pm2 reload ${PM2_APP_NAME}
"
