# Runbook: Digital Portfolio (Production Deploy)

This is the cleaned, working procedure we used.

## 1) Install Node 20.19+ (required by Prisma)

```bash
nvm install 20.19.0
nvm use 20.19.0
node -v
```

## 2) Install app dependencies

If `npm install` gets killed (OOM), add swap first.

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Then install:

```bash
rm -rf node_modules package-lock.json
npm install --omit=optional
```

## 3) Environment variables

```bash
cp .env.example .env
nano .env
```

Minimum required:

```
DATABASE_URL=postgresql://user:password@localhost:5432/digital_portfolio?schema=public
NEXT_PUBLIC_BASE_URL=http://31.57.241.122
```

## 4) Prisma

```bash
npx prisma generate
npx prisma migrate deploy
```

Optional seed:

```bash
npm run db:seed
```

## 5) Build

```bash
npm run build
```

## 6) systemd service

Create:

```bash
sudo nano /etc/systemd/system/digital-portfolio.service
```

Use:

```
[Unit]
Description=Digital Portfolio Next.js App
After=network.target

[Service]
Type=simple
User=user
WorkingDirectory=/home/user/Documents/digital-portfolio
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=PATH=/home/user/.config/nvm/versions/node/v20.19.0/bin:/usr/bin:/bin
EnvironmentFile=/home/user/Documents/digital-portfolio/.env
ExecStart=/home/user/.config/nvm/versions/node/v20.19.0/bin/npm run start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable digital-portfolio
sudo systemctl start digital-portfolio
sudo systemctl status digital-portfolio
```

## 7) Nginx (IP-based)

```bash
sudo nano /etc/nginx/sites-available/digital-portfolio
```

```
server {
    listen 80;
    server_name 31.57.241.122;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/digital-portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Open:

```
http://31.57.241.122
```

## 8) HTTPS (when you have a domain)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

