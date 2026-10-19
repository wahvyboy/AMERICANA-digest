#!/usr/bin/env bash
# ==============================================================================
# AMERICANA DIGEST - INITIAL VPS ENVIRONMENT SETUP & NGINX CONFIGURATION
# ==============================================================================
# Domain: americanadigest.blog / www.americanadigest.blog
# Target Directory: /var/www/americanadigest.blog
# ==============================================================================

set -euo pipefail

echo "=========================================================="
echo " Starting Americana Digest VPS Setup"
echo " Date: $(date)"
echo "=========================================================="

# 1. Update packages and install Node.js 20+ & Nginx & Git & Certbot
echo ">>> [1/6] Updating apt packages..."
sudo apt-get update -y

echo ">>> [2/6] Installing prerequisites (Git, Nginx, Curl, Certbot)..."
sudo apt-get install -y git curl nginx certbot python3-certbot-nginx

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo ">>> Installing Node.js LTS (v20)..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo ">>> Node.js already installed: $(node -v)"
fi

# 2. Setup project web directory
WEB_DIR="/var/www/americanadigest.blog"
echo ">>> [3/6] Setting up project directory at ${WEB_DIR}..."
sudo mkdir -p "${WEB_DIR}"
sudo chown -R $USER:$USER "${WEB_DIR}"

if [ ! -d "${WEB_DIR}/.git" ]; then
  echo ">>> Cloning Americana Digest repository from GitHub..."
  git clone https://github.com/wahvyboy/AMERICANA-digest.git "${WEB_DIR}"
else
  echo ">>> Existing repo detected. Pulling latest commits..."
  cd "${WEB_DIR}"
  git pull origin main
fi

cd "${WEB_DIR}"

# 3. Build project
echo ">>> [4/6] Installing dependencies and building production bundle..."
npm install --prefer-offline --no-audit
npm run build

# 4. Configure Nginx Server Block (High performance static serving + SEO/AEO caching)
echo ">>> [5/6] Configuring Nginx for americanadigest.blog..."
NGINX_CONF="/etc/nginx/sites-available/americanadigest.blog"

sudo tee "${NGINX_CONF}" > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name americanadigest.blog www.americanadigest.blog;

    root /var/www/americanadigest.blog/dist;
    index index.html;

    # Gzip Compression for maximum LCP & Core Web Vitals
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml font/woff2 application/x-font-ttf image/svg+xml;

    # Search Engine & Crawler Optimization
    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    location = /sitemap.xml {
        allow all;
        log_not_found off;
        access_log off;
    }

    # Static Assets Long-Term Caching
    location ~* \.(jpg|jpeg|png|webp|gif|svg|ico|css|js|woff2|woff|ttf)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # SPA routing fallback for search engines & browsers
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Enable site if not already enabled
if [ ! -f /etc/nginx/sites-enabled/americanadigest.blog ]; then
  sudo ln -s "${NGINX_CONF}" /etc/nginx/sites-enabled/
fi

# Remove default site if it exists to prevent conflict
if [ -f /etc/nginx/sites-enabled/default ]; then
  sudo rm -f /etc/nginx/sites-enabled/default
fi

# Test and reload Nginx
echo ">>> Verifying Nginx configuration syntax..."
sudo nginx -t
sudo systemctl reload nginx

echo ">>> [6/6] Requesting SSL Certificate via Let's Encrypt Certbot..."
echo "Note: If your domain DNS already points to this VPS IP, SSL will be automatically activated."
sudo certbot --nginx -d americanadigest.blog -d www.americanadigest.blog --non-interactive --agree-tos -m support@americanadigest.blog --redirect || {
  echo "Certbot note: Ensure your DNS A record points to this server IP before running: sudo certbot --nginx -d americanadigest.blog -d www.americanadigest.blog"
}

echo "=========================================================="
echo " AMERICANA DIGEST PRODUCTION DEPLOYMENT COMPLETE!"
echo " Live URL: http://americanadigest.blog (or https if SSL succeeded)"
echo " Project Directory: ${WEB_DIR}"
echo "=========================================================="
