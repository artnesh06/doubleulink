#!/bin/bash

# DOUBLEULINK Deployment Script
# Usage: ./deploy.sh [production|staging]

set -e

ENV=${1:-production}
SERVER_USER="root"
SERVER_HOST="your-server-ip"
SERVER_PATH="/var/www/doubleulink"
APP_NAME="doubleulink-api"

echo "🚀 Deploying DOUBLEULINK to $ENV..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if server details are configured
if [ "$SERVER_HOST" = "your-server-ip" ]; then
    echo -e "${RED}❌ Please configure SERVER_HOST in deploy.sh${NC}"
    exit 1
fi

# 1. Run tests (if any)
echo -e "${YELLOW}📋 Running tests...${NC}"
# npm test

# 2. Build (if needed)
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install --production

# 3. Upload to server
echo -e "${YELLOW}📤 Uploading files to server...${NC}"
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.env' \
    --exclude 'uploads' \
    --exclude '.git' \
    ./ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/server/

# 4. Install dependencies on server
echo -e "${YELLOW}📦 Installing dependencies on server...${NC}"
ssh $SERVER_USER@$SERVER_HOST << EOF
    cd $SERVER_PATH/server
    npm install --production
EOF

# 5. Restart PM2
echo -e "${YELLOW}🔄 Restarting application...${NC}"
ssh $SERVER_USER@$SERVER_HOST << EOF
    pm2 restart $APP_NAME
    pm2 save
EOF

# 6. Check status
echo -e "${YELLOW}✅ Checking application status...${NC}"
ssh $SERVER_USER@$SERVER_HOST << EOF
    pm2 status $APP_NAME
    pm2 logs $APP_NAME --lines 20 --nostream
EOF

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 API: https://api.yourdomain.com${NC}"
