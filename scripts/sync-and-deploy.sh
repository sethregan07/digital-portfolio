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

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

VPS_USER="${VPS_USER:-user}"
VPS_HOST="${VPS_HOST:-31.57.241.122}"
VPS_APP_DIR="${VPS_APP_DIR:-/home/user/Documents/digital-portfolio}"
VPS_SERVICE="${VPS_SERVICE:-digital-portfolio}"
REMOTE_NODE_BIN="${REMOTE_NODE_BIN:-/home/user/.config/nvm/versions/node/v20.19.0/bin}"

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
npx prisma generate
npm install --omit=optional
rm -rf .next
npm run build
sudo systemctl restart '${VPS_SERVICE}'
sudo systemctl status '${VPS_SERVICE}' --no-pager
"

echo "Sync and deploy complete."
