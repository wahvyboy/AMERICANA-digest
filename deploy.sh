#!/usr/bin/env bash
# ==============================================================================
# AMERICANA DIGEST - PRODUCTION VPS DEPLOYMENT AUTOMATION
# ==============================================================================
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh
# ==============================================================================

set -euo pipefail

# Configuration
APP_NAME="americana-digest"
APP_DIR="${APP_DIR:-$(pwd)}"
BRANCH="${1:-main}"
PORT="${PORT:-3000}"

echo "=========================================================="
echo " Starting Americana Digest Deployment on branch: ${BRANCH}"
echo " Directory: ${APP_DIR}"
echo " Date: $(date)"
echo "=========================================================="

cd "${APP_DIR}"

# 1. Fetch latest changes from GitHub
echo ">>> [1/5] Fetching latest commits from origin/${BRANCH}..."
git fetch origin "${BRANCH}"

# Check for unstaged changes and stash them if necessary
if ! git diff-index --quiet HEAD --; then
  echo ">>> Stashing local changes to prevent merge conflicts..."
  git stash push -m "Auto-stashed before deploy at $(date +%s)"
fi

echo ">>> Fast-forwarding to latest origin/${BRANCH}..."
git reset --hard "origin/${BRANCH}"

# 2. Install production dependencies
echo ">>> [2/5] Installing dependencies with peer resolution..."
npm install --legacy-peer-deps --prefer-offline --no-audit

# 3. Build optimized production bundle
echo ">>> [3/5] Building production client..."
npm run build

# 4. Process Management (PM2 / Systemd / Preview Server)
echo ">>> [4/5] Reloading application process..."
if command -v pm2 &> /dev/null; then
  if pm2 describe "${APP_NAME}" &> /dev/null; then
    echo ">>> PM2 process '${APP_NAME}' exists. Reloading with zero downtime..."
    pm2 reload "${APP_NAME}" --update-env
  else
    echo ">>> Starting new PM2 instance '${APP_NAME}' on port ${PORT}..."
    pm2 start "npx vite preview --port ${PORT} --host 0.0.0.0" --name "${APP_NAME}"
    pm2 save
  fi
else
  echo ">>> PM2 is not installed globally."
  echo ">>> Dist files updated in ${APP_DIR}/dist (ready for Nginx direct static serving)."
fi

# 5. Reload Nginx if configured
if command -v nginx &> /dev/null && [ -f /etc/nginx/sites-enabled/americana-digest ]; then
  echo ">>> [5/5] Reloading Nginx configuration..."
  sudo nginx -t && sudo systemctl reload nginx
else
  echo ">>> [5/5] Skipping Nginx reload (not detected or configured)."
fi

echo "=========================================================="
echo " Deployment Successfully Finished!"
echo " Local URL: http://localhost:${PORT}"
echo "=========================================================="
