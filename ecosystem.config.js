\
/**
 * Example ecosystem.config.js for PM2 + Next.js
 * If you used the deploy script, an ecosystem file was already created at /var/www/<app>/ecosystem.config.js
 * pointing to a start wrapper that sources your .env and runs `npm run start -p $PORT`.
 */
module.exports = {
  apps: [
    {
      name: "landing-page",
      cwd: "/home/deploy/apps/landing-page/current",
      script: "/home/deploy/apps/landing-page/shared/start.sh",
      exec_mode: "fork",     // change to "cluster" and set instances if desired
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: "3000"
      },
      watch: false,
      max_memory_restart: "512M",
      out_file: "/home/deploy/apps/landing-page/logs/out.log",
      error_file: "/home/deploy/apps/landing-page/logs/err.log",
      time: true
    }
  ]
}
