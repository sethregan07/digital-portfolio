#!/usr/bin/env bash
set -euo pipefail

# Simple deploy script for the VPS
# Usage: ./scripts/deploy.sh

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$APP_DIR"

echo "Pulling latest code..."
git pull --ff-only

echo "Installing dependencies..."
npm install --omit=optional

echo "Generating Prisma client..."
npx prisma generate

echo "Applying migrations..."
npx prisma migrate deploy

echo "Building app..."
npm run build

echo "Restarting service..."
sudo systemctl restart digital-portfolio

echo "Done."
