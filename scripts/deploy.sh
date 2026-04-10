#!/usr/bin/env bash
set -euo pipefail

# Simple deploy script for the VPS
# Usage: ./scripts/deploy.sh
# Optional overrides:
#   RUN_MIGRATIONS=true
#   SEED_DB=true
#   HEALTHCHECK_URL=http://127.0.0.1:3000/

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN_MIGRATIONS="${RUN_MIGRATIONS:-true}"
SEED_DB="${SEED_DB:-false}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://127.0.0.1:3000/}"
HEALTHCHECK_ATTEMPTS="${HEALTHCHECK_ATTEMPTS:-20}"
HEALTHCHECK_DELAY_SECONDS="${HEALTHCHECK_DELAY_SECONDS:-1}"

cd "$APP_DIR"

echo "Pulling latest code..."
git pull --ff-only

echo "Installing dependencies..."
npm install --omit=optional

echo "Generating Prisma client..."
npx prisma generate

if [[ "$RUN_MIGRATIONS" == "true" ]]; then
  echo "Applying migrations..."
  npx prisma migrate deploy
fi

echo "Building app..."
npm run build

if [[ "$SEED_DB" == "true" ]]; then
  echo "Seeding database..."
  npm run db:seed
fi

echo "Restarting service..."
sudo systemctl restart digital-portfolio

sleep 2

if ! sudo systemctl is-active --quiet digital-portfolio; then
  sudo systemctl status digital-portfolio --no-pager -l || true
  sudo journalctl -u digital-portfolio -n 100 --no-pager || true
  exit 1
fi

for attempt in $(seq 1 "$HEALTHCHECK_ATTEMPTS"); do
  if curl -fsS "$HEALTHCHECK_URL" >/dev/null; then
    echo "Health check passed."
    break
  fi

  if [[ "$attempt" == "$HEALTHCHECK_ATTEMPTS" ]]; then
    echo "Health check failed after restart."
    sudo systemctl status digital-portfolio --no-pager -l || true
    sudo journalctl -u digital-portfolio -n 100 --no-pager || true
    exit 1
  fi

  sleep "$HEALTHCHECK_DELAY_SECONDS"
done

echo "Done."
