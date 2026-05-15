# DOUBLEULINK Server Deployment Guide (Contabo)

## Prerequisites
- Contabo VPS dengan Ubuntu 22.04
- Domain sudah pointing ke IP Contabo
- SSH access ke server

## 1. Setup Server (First Time)

### Connect to server
```bash
ssh root@your-server-ip
```

### Update system
```bash
apt update && apt upgrade -y
```

### Install Node.js 20
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v  # Should show v20.x
```

### Install PostgreSQL
```bash
apt install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql
```

### Install Nginx
```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

### Install PM2 (Process Manager)
```bash
npm install -g pm2
```

### Install Certbot (SSL)
```bash
apt install -y certbot python3-certbot-nginx
```

## 2. Setup Database

### Create database and user
```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE doubleulink;
CREATE USER doubleulink_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE doubleulink TO doubleulink_user;
\q
```

### Import schema
```bash
# Upload schema.sql to server first
sudo -u postgres psql doubleulink < /path/to/schema.sql
```

## 3. Setup Application

### Create app directory
```bash
mkdir -p /var/www/doubleulink
cd /var/www/doubleulink
```

### Clone or upload your code
```bash
# Option 1: Git (recommended)
git clone https://github.com/yourusername/doubleulink.git .

# Option 2: Upload via SCP from local
# scp -r ./server root@your-server-ip:/var/www/doubleulink/
```

### Install dependencies
```bash
cd /var/www/doubleulink/server
npm install --production
```

### Create .env file
```bash
nano .env
```

Paste this (adjust values):
```env
PORT=3001
NODE_ENV=production

DB_HOST=localhost
DB_PORT=5432
DB_NAME=doubleulink
DB_USER=doubleulink_user
DB_PASSWORD=your_secure_password

JWT_SECRET=your_very_long_random_secret_min_32_characters
JWT_EXPIRES_IN=7d

FRONTEND_URL=https://yourdomain.com

UPLOAD_DIR=/var/www/doubleulink/uploads
MAX_FILE_SIZE=5242880
```

### Create uploads directory
```bash
mkdir -p /var/www/doubleulink/uploads/avatars
mkdir -p /var/www/doubleulink/uploads/shop
chown -R www-data:www-data /var/www/doubleulink/uploads
chmod -R 755 /var/www/doubleulink/uploads
```

## 4. Setup PM2

### Start application
```bash
cd /var/www/doubleulink/server
pm2 start src/index.js --name doubleulink-api
pm2 save
pm2 startup
```

### Check status
```bash
pm2 status
pm2 logs doubleulink-api
```

## 5. Setup Nginx

### Create Nginx config
```bash
nano /etc/nginx/sites-available/doubleulink-api
```

Paste this:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;

    # API
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
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Uploads
    location /uploads {
        alias /var/www/doubleulink/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Max upload size
    client_max_body_size 10M;
}
```

### Enable site
```bash
ln -s /etc/nginx/sites-available/doubleulink-api /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## 6. Setup SSL (HTTPS)

```bash
certbot --nginx -d api.yourdomain.com
```

Follow prompts. Certbot will auto-renew.

## 7. Setup Frontend (Vite Build)

### On local machine, build frontend
```bash
cd /path/to/doubleulink
npm run build
```

### Upload dist to server
```bash
scp -r ./dist root@your-server-ip:/var/www/doubleulink/frontend
```

### Create Nginx config for frontend
```bash
nano /etc/nginx/sites-available/doubleulink-frontend
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/doubleulink/frontend;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Enable and get SSL
```bash
ln -s /etc/nginx/sites-available/doubleulink-frontend /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 8. Firewall Setup

```bash
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
ufw status
```

## 9. Monitoring & Maintenance

### View logs
```bash
pm2 logs doubleulink-api
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### Restart services
```bash
pm2 restart doubleulink-api
systemctl restart nginx
systemctl restart postgresql
```

### Update application
```bash
cd /var/www/doubleulink/server
git pull
npm install --production
pm2 restart doubleulink-api
```

### Database backup
```bash
# Create backup script
nano /root/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
sudo -u postgres pg_dump doubleulink > $BACKUP_DIR/doubleulink_$DATE.sql
# Keep only last 7 days
find $BACKUP_DIR -name "doubleulink_*.sql" -mtime +7 -delete
```

```bash
chmod +x /root/backup-db.sh
# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /root/backup-db.sh
```

## 10. Environment Variables for Frontend

Update `.env.local` in frontend:
```env
VITE_API_URL=https://api.yourdomain.com
```

Rebuild and redeploy frontend after changing.

## Troubleshooting

### API not responding
```bash
pm2 status
pm2 logs doubleulink-api --lines 100
```

### Database connection issues
```bash
sudo -u postgres psql doubleulink
# Check if tables exist
\dt
```

### Nginx errors
```bash
nginx -t
tail -f /var/log/nginx/error.log
```

### SSL renewal
```bash
certbot renew --dry-run
```

## Security Checklist

- [ ] Strong database password
- [ ] Strong JWT secret (min 32 chars)
- [ ] Firewall enabled (ufw)
- [ ] SSL certificates installed
- [ ] Rate limiting configured
- [ ] Regular backups scheduled
- [ ] PM2 auto-restart enabled
- [ ] Nginx security headers added
- [ ] PostgreSQL only listening on localhost
- [ ] SSH key-based auth (disable password)

## Performance Tips

1. **Database indexing**: Already in schema.sql
2. **Nginx caching**: Already configured
3. **PM2 cluster mode**: For high traffic
   ```bash
   pm2 start src/index.js -i max --name doubleulink-api
   ```
4. **PostgreSQL tuning**: Adjust based on RAM
5. **CDN**: Use Cloudflare for static assets

## Estimated Costs (Contabo)

- VPS 4GB RAM: ~€5-10/month
- Domain: ~€10/year
- SSL: Free (Let's Encrypt)
- **Total: ~€7-12/month**

Much cheaper than Supabase/Vercel for high traffic! 🚀
