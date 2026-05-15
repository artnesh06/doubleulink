# DOUBLEULINK - Complete Setup Guide

## 🎯 Overview

DOUBLEULINK adalah platform "link in bio" dengan backend custom di Contabo VPS.

**Tech Stack:**
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + PostgreSQL
- **Server**: Contabo VPS + Nginx + PM2
- **Auth**: JWT
- **Storage**: Local file system

---

## 📋 Prerequisites

### Local Development:
- Node.js 20+
- Git
- Code editor (VS Code recommended)

### Production Server (Contabo):
- VPS dengan Ubuntu 22.04
- Domain name (optional tapi recommended)
- SSH access

---

## 🚀 Part 1: Local Development Setup

### 1. Clone Repository
```bash
cd ~/Documents/VIBE\ CODE/DOUBLEULINK
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Already configured in .env.local
VITE_API_URL=http://localhost:3001
```

### 4. Install Backend Dependencies
```bash
cd server
npm install
```

### 5. Setup Local PostgreSQL

#### Install PostgreSQL (macOS)
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Create Database
```bash
psql postgres
```

```sql
CREATE DATABASE doubleulink;
CREATE USER doubleulink_user WITH PASSWORD 'dev_password';
GRANT ALL PRIVILEGES ON DATABASE doubleulink TO doubleulink_user;
\q
```

#### Import Schema
```bash
psql doubleulink < src/database/schema.sql
```

### 6. Configure Backend Environment
```bash
cd server
cp .env.example .env
```

Edit `.env`:
```env
PORT=3001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=doubleulink
DB_USER=doubleulink_user
DB_PASSWORD=dev_password

JWT_SECRET=your_local_dev_secret_min_32_chars
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173

UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### 7. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 8. Test Local Setup

Open browser:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/health

---

## 🌐 Part 2: Production Deployment (Contabo)

### Step 1: Prepare Contabo VPS

#### 1.1 Connect to Server
```bash
ssh root@your-contabo-ip
```

#### 1.2 Update System
```bash
apt update && apt upgrade -y
```

#### 1.3 Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v  # Verify: v20.x
```

#### 1.4 Install PostgreSQL
```bash
apt install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql
```

#### 1.5 Install Nginx
```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

#### 1.6 Install PM2
```bash
npm install -g pm2
```

#### 1.7 Setup Firewall
```bash
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

### Step 2: Setup Database

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE doubleulink;
CREATE USER doubleulink_user WITH PASSWORD 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE doubleulink TO doubleulink_user;
\q
```

### Step 3: Deploy Application

#### 3.1 Create App Directory
```bash
mkdir -p /var/www/doubleulink
cd /var/www/doubleulink
```

#### 3.2 Upload Code

**Option A: Git (Recommended)**
```bash
# On server
git clone https://github.com/yourusername/doubleulink.git .
```

**Option B: SCP from Local**
```bash
# On local machine
cd ~/Documents/VIBE\ CODE/DOUBLEULINK
scp -r ./server root@your-contabo-ip:/var/www/doubleulink/
```

#### 3.3 Install Backend Dependencies
```bash
cd /var/www/doubleulink/server
npm install --production
```

#### 3.4 Import Database Schema
```bash
sudo -u postgres psql doubleulink < /var/www/doubleulink/server/src/database/schema.sql
```

#### 3.5 Create Production .env
```bash
nano /var/www/doubleulink/server/.env
```

```env
PORT=3001
NODE_ENV=production

DB_HOST=localhost
DB_PORT=5432
DB_NAME=doubleulink
DB_USER=doubleulink_user
DB_PASSWORD=YOUR_STRONG_PASSWORD

JWT_SECRET=YOUR_VERY_LONG_RANDOM_SECRET_MIN_32_CHARS
JWT_EXPIRES_IN=7d

FRONTEND_URL=https://yourdomain.com

UPLOAD_DIR=/var/www/doubleulink/uploads
MAX_FILE_SIZE=5242880
```

#### 3.6 Create Upload Directories
```bash
mkdir -p /var/www/doubleulink/uploads/avatars
mkdir -p /var/www/doubleulink/uploads/shop
chown -R www-data:www-data /var/www/doubleulink/uploads
chmod -R 755 /var/www/doubleulink/uploads
```

#### 3.7 Start with PM2
```bash
cd /var/www/doubleulink/server
pm2 start src/index.js --name doubleulink-api
pm2 save
pm2 startup
# Copy and run the command PM2 outputs
```

### Step 4: Setup Nginx

#### 4.1 Create API Config
```bash
nano /etc/nginx/sites-available/doubleulink-api
```

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads {
        alias /var/www/doubleulink/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    client_max_body_size 10M;
}
```

#### 4.2 Enable Site
```bash
ln -s /etc/nginx/sites-available/doubleulink-api /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

#### 4.3 Install SSL
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.yourdomain.com
```

### Step 5: Deploy Frontend

#### 5.1 Build Frontend Locally
```bash
# On local machine
cd ~/Documents/VIBE\ CODE/DOUBLEULINK

# Update .env.local for production
echo "VITE_API_URL=https://api.yourdomain.com" > .env.local

# Build
npm run build
```

#### 5.2 Upload to Server
```bash
scp -r ./dist root@your-contabo-ip:/var/www/doubleulink/frontend
```

#### 5.3 Create Frontend Nginx Config
```bash
# On server
nano /etc/nginx/sites-available/doubleulink-frontend
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/doubleulink/frontend;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 5.4 Enable and SSL
```bash
ln -s /etc/nginx/sites-available/doubleulink-frontend /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## ✅ Verification

### Check Backend
```bash
curl https://api.yourdomain.com/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Check Frontend
Open browser: https://yourdomain.com

### Check PM2
```bash
pm2 status
pm2 logs doubleulink-api
```

---

## 🔧 Maintenance

### Update Application
```bash
cd /var/www/doubleulink/server
git pull
npm install --production
pm2 restart doubleulink-api
```

### View Logs
```bash
pm2 logs doubleulink-api
tail -f /var/log/nginx/error.log
```

### Database Backup
```bash
sudo -u postgres pg_dump doubleulink > backup_$(date +%Y%m%d).sql
```

### Restart Services
```bash
pm2 restart doubleulink-api
systemctl restart nginx
systemctl restart postgresql
```

---

## 🐛 Troubleshooting

### Backend not starting
```bash
pm2 logs doubleulink-api --lines 100
# Check .env file
# Check database connection
```

### Database connection error
```bash
sudo -u postgres psql doubleulink
\dt  # List tables
# Check DB credentials in .env
```

### Nginx errors
```bash
nginx -t
tail -f /var/log/nginx/error.log
```

### SSL issues
```bash
certbot renew --dry-run
```

---

## 📊 Monitoring

### Setup Monitoring Script
```bash
nano /root/monitor.sh
```

```bash
#!/bin/bash
echo "=== PM2 Status ==="
pm2 status

echo -e "\n=== Disk Usage ==="
df -h

echo -e "\n=== Memory Usage ==="
free -h

echo -e "\n=== Database Size ==="
sudo -u postgres psql -c "SELECT pg_size_pretty(pg_database_size('doubleulink'));"
```

```bash
chmod +x /root/monitor.sh
./monitor.sh
```

---

## 💰 Cost Estimate

- **Contabo VPS 4GB**: €6-10/month
- **Domain**: €10/year
- **SSL**: Free (Let's Encrypt)
- **Total**: ~€8-12/month

**vs Supabase/Vercel**: $25-100/month for similar traffic

---

## 🎉 Next Steps

1. ✅ Setup complete
2. 🔐 Change all default passwords
3. 📧 Setup email notifications (optional)
4. 📊 Setup analytics (optional)
5. 🚀 Start marketing!

---

## 📞 Support

Jika ada masalah:
1. Check logs: `pm2 logs doubleulink-api`
2. Check Nginx: `tail -f /var/log/nginx/error.log`
3. Check database: `sudo -u postgres psql doubleulink`

---

**Happy Deploying! 🚀**
