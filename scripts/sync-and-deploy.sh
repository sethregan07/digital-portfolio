#!/usr/bin/env bash
set -euo pipefail

# Sync the local repo to the VPS, then rebuild and restart the app there.
#
# Usage:
#   ./scripts/sync-and-deploy.sh
#
# Optional overrides:
#   VPS_USER=user
#   VPS_HOST=31.57.241.122
#   VPS_APP_DIR=/home/user/Documents/digital-portfolio
#   VPS_SERVICE=digital-portfolio
#   SSH_KEY=~/.ssh/vps_key
#   REMOTE_NODE_BIN=/home/user/.config/nvm/versions/node/v20.19.0/bin
#   RUN_MIGRATIONS=true
#   SEED_DB=true
#   HEALTHCHECK_URL=http://127.0.0.1:3000/

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

VPS_USER="${VPS_USER:-user}"
VPS_HOST="${VPS_HOST:-31.57.241.122}"
VPS_APP_DIR="${VPS_APP_DIR:-/home/user/Documents/digital-portfolio}"
VPS_SERVICE="${VPS_SERVICE:-digital-portfolio}"
REMOTE_NODE_BIN="${REMOTE_NODE_BIN:-/home/user/.config/nvm/versions/node/v20.19.0/bin}"
RUN_MIGRATIONS="${RUN_MIGRATIONS:-true}"
SEED_DB="${SEED_DB:-false}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://127.0.0.1:3000/}"
HEALTHCHECK_ATTEMPTS="${HEALTHCHECK_ATTEMPTS:-20}"
HEALTHCHECK_DELAY_SECONDS="${HEALTHCHECK_DELAY_SECONDS:-1}"

REMOTE_TARGET="${VPS_USER}@${VPS_HOST}:${VPS_APP_DIR}/"
SSH_CMD="ssh"

if [[ -n "${SSH_KEY:-}" ]]; then
  SSH_CMD="ssh -i ${SSH_KEY}"
fi

echo "Syncing local files to ${REMOTE_TARGET}"
rsync -avz --delete \
  --exclude .git \
  --exclude .env \
  --exclude node_modules \
  --exclude .next \
  --exclude .contentlayer \
  --exclude tsconfig.tsbuildinfo \
  --exclude .DS_Store \
  -e "${SSH_CMD}" \
  "${ROOT_DIR}/" \
  "${REMOTE_TARGET}"

echo "Running remote build and restart"
${SSH_CMD} -t "${VPS_USER}@${VPS_HOST}" "set -euo pipefail
cd '${VPS_APP_DIR}'
export PATH='${REMOTE_NODE_BIN}':\$PATH
npm install --omit=optional
npx prisma generate
if [[ '${RUN_MIGRATIONS}' == 'true' ]]; then
  npx prisma migrate deploy
fi
rm -rf .next
npm run build
if [[ '${SEED_DB}' == 'true' ]]; then
  npm run db:seed
fi
sudo systemctl restart '${VPS_SERVICE}'
sleep 2

if ! sudo systemctl is-active --quiet '${VPS_SERVICE}'; then
  sudo systemctl status '${VPS_SERVICE}' --no-pager -l || true
  sudo journalctl -u '${VPS_SERVICE}' -n 100 --no-pager || true
  exit 1
fi

for attempt in \$(seq 1 ${HEALTHCHECK_ATTEMPTS}); do
  if curl -fsS '${HEALTHCHECK_URL}' >/dev/null; then
    echo 'Health check passed.'
    break
  fi

  if [[ \"\$attempt\" == '${HEALTHCHECK_ATTEMPTS}' ]]; then
    echo 'Health check failed after restart.'
    sudo systemctl status '${VPS_SERVICE}' --no-pager -l || true
    sudo journalctl -u '${VPS_SERVICE}' -n 100 --no-pager || true
    exit 1
  fi

  sleep '${HEALTHCHECK_DELAY_SECONDS}'
done

sudo systemctl status '${VPS_SERVICE}' --no-pager -l
"

echo "Sync and deploy complete."
