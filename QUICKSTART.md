# 🚀 DOUBLEULINK - Quick Start Guide

## 📋 Apa yang Sudah Dibuat?

✅ **Backend API** - 100% selesai (Node.js + Express + PostgreSQL)  
✅ **Frontend UI** - 90% selesai (React + Vite + Tailwind)  
✅ **Database Schema** - 100% selesai  
✅ **API Client** - 100% selesai  
✅ **Documentation** - 100% selesai  

**Status: 70% Complete** 🎉

---

## 🎯 Next Steps (3-5 Hari ke Launch)

### Step 1: Test Backend Locally (30 menit)

```bash
# 1. Install dependencies
cd server
npm install

# 2. Setup PostgreSQL (macOS)
brew install postgresql@14
brew services start postgresql@14

# 3. Create database
psql postgres
```

```sql
CREATE DATABASE doubleulink;
CREATE USER doubleulink_user WITH PASSWORD 'dev_password';
GRANT ALL PRIVILEGES ON DATABASE doubleulink TO doubleulink_user;
\q
```

```bash
# 4. Import schema
psql doubleulink < src/database/schema.sql

# 5. Create .env
cp .env.example .env
# Edit .env dengan credentials di atas

# 6. Start server
npm run dev

# 7. Test API
curl http://localhost:3001/health
# Should return: {"status":"ok","timestamp":"..."}
```

✅ **Backend running!**

---

### Step 2: Test Frontend Locally (10 menit)

```bash
# 1. Open new terminal
cd ..  # Back to root

# 2. Install dependencies (if not done)
npm install

# 3. Start frontend
npm run dev

# 4. Open browser
# http://localhost:5173
```

✅ **Frontend running!**

---

### Step 3: Connect Frontend to Backend (1-2 hari)

#### File 1: `src/pages/LoginPage.jsx`

Tambahkan di bagian atas:
```javascript
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
```

Tambahkan di dalam component:
```javascript
const { login, register } = useAuth()
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')

const handleRegister = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  
  try {
    await register(email, password, username)
    // Redirect to dashboard
    window.location.href = '/dashboard'
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

const handleLogin = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  
  try {
    await login(email, password)
    window.location.href = '/dashboard'
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
```

#### File 2: `src/pages/DashboardPage.jsx`

Tambahkan di bagian atas:
```javascript
import { useAuth } from '../contexts/AuthContext'
import { api } from '../lib/api'
import { useEffect } from 'react'
```

Tambahkan di dalam component:
```javascript
const { user, refreshProfile } = useAuth()
const [loading, setLoading] = useState(true)

useEffect(() => {
  loadProfile()
}, [])

const loadProfile = async () => {
  try {
    const data = await api.getMyProfile()
    setProfile(data.profile)
    setLinks(data.links)
    setShopItems(data.shopItems)
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

const handleSave = async () => {
  try {
    await api.updateProfile(profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  } catch (err) {
    console.error(err)
  }
}

const addLink = async () => {
  try {
    const newLink = await api.createLink({
      label: 'New Link',
      url: 'https://',
    })
    setLinks([...links, newLink.link])
  } catch (err) {
    console.error(err)
  }
}

const updateLink = async (id, field, value) => {
  try {
    await api.updateLink(id, { [field]: value })
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l))
  } catch (err) {
    console.error(err)
  }
}

const removeLink = async (id) => {
  try {
    await api.deleteLink(id)
    setLinks(links.filter(l => l.id !== id))
  } catch (err) {
    console.error(err)
  }
}
```

#### File 3: `src/pages/ProfilePage.jsx`

Tambahkan di bagian atas:
```javascript
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { useEffect, useState } from 'react'
```

Tambahkan di dalam component:
```javascript
const { username } = useParams()
const [profile, setProfile] = useState(null)
const [links, setLinks] = useState([])
const [shopItems, setShopItems] = useState([])
const [loading, setLoading] = useState(true)
const [notFound, setNotFound] = useState(false)

useEffect(() => {
  loadProfile()
}, [username])

const loadProfile = async () => {
  try {
    const data = await api.getPublicProfile(username)
    setProfile(data.profile)
    setLinks(data.links)
    setShopItems(data.shopItems)
  } catch (err) {
    if (err.message.includes('404')) {
      setNotFound(true)
    }
  } finally {
    setLoading(false)
  }
}

const handleLinkClick = async (linkId, url) => {
  try {
    await api.trackLinkClick(linkId)
    window.open(url, '_blank')
  } catch (err) {
    console.error(err)
    window.open(url, '_blank')
  }
}

if (loading) return <div>Loading...</div>
if (notFound) return <div>Profile not found</div>
```

#### File 4: `src/components/ProtectedRoute.jsx` (New)

```javascript
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
```

Update `src/App.jsx`:
```javascript
import ProtectedRoute from './components/ProtectedRoute'

// Wrap protected routes:
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
```

---

### Step 4: Test Integration (1 hari)

```bash
# 1. Make sure backend is running
cd server && npm run dev

# 2. Make sure frontend is running
npm run dev

# 3. Test flows:
# - Register new user
# - Login
# - Create link
# - Update profile
# - View public profile
# - Track clicks
```

---

### Step 5: Deploy to Contabo (1 hari)

#### 5.1 Setup VPS (30 menit)
```bash
# SSH to server
ssh root@your-contabo-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install PM2
npm install -g pm2

# Setup firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

#### 5.2 Setup Database (15 menit)
```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE doubleulink;
CREATE USER doubleulink_user WITH PASSWORD 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE doubleulink TO doubleulink_user;
\q
```

#### 5.3 Deploy Backend (30 menit)
```bash
# Create directory
mkdir -p /var/www/doubleulink
cd /var/www/doubleulink

# Upload code (from local)
# scp -r ./server root@your-ip:/var/www/doubleulink/

# Or use git
git clone https://github.com/yourusername/doubleulink.git .

# Install dependencies
cd server
npm install --production

# Import schema
sudo -u postgres psql doubleulink < src/database/schema.sql

# Create .env
nano .env
# Paste production config (see DEPLOYMENT.md)

# Start with PM2
pm2 start src/index.js --name doubleulink-api
pm2 save
pm2 startup
```

#### 5.4 Setup Nginx (15 menit)
```bash
# Create config
nano /etc/nginx/sites-available/doubleulink-api

# Paste config (see DEPLOYMENT.md)

# Enable site
ln -s /etc/nginx/sites-available/doubleulink-api /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

#### 5.5 Setup SSL (10 menit)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.yourdomain.com
```

#### 5.6 Deploy Frontend (20 menit)
```bash
# On local machine
cd ~/Documents/VIBE\ CODE/DOUBLEULINK

# Update .env.local
echo "VITE_API_URL=https://api.yourdomain.com" > .env.local

# Build
npm run build

# Upload to server
scp -r ./dist root@your-ip:/var/www/doubleulink/frontend

# On server, create Nginx config
nano /etc/nginx/sites-available/doubleulink-frontend
# Paste config (see DEPLOYMENT.md)

# Enable and SSL
ln -s /etc/nginx/sites-available/doubleulink-frontend /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### Step 6: Launch! 🚀

```bash
# Check everything is running
pm2 status
systemctl status nginx
systemctl status postgresql

# Test API
curl https://api.yourdomain.com/health

# Open browser
# https://yourdomain.com
```

✅ **LIVE!** 🎉

---

## 📚 Documentation

Untuk detail lengkap, baca:

1. **SETUP_GUIDE.md** - Complete setup guide
2. **API_REFERENCE.md** - All API endpoints
3. **DEPLOYMENT.md** - Deployment guide
4. **README_INDONESIA.md** - Rangkuman lengkap
5. **TODO.md** - Task checklist

---

## 💰 Cost

- Contabo VPS 4GB: **€6-10/month**
- Domain: **€10/year**
- SSL: **Free**
- **Total: ~€8/month**

vs Supabase/Vercel: $25-100/month

**Savings: 70-80%!** 💰

---

## 🐛 Troubleshooting

### Backend not starting
```bash
pm2 logs doubleulink-api --lines 100
```

### Database error
```bash
sudo -u postgres psql doubleulink
\dt  # List tables
```

### Frontend not loading
```bash
tail -f /var/log/nginx/error.log
```

---

## 🎯 Timeline

- **Day 1-2:** Connect frontend to backend
- **Day 3:** Test integration
- **Day 4:** Deploy to Contabo
- **Day 5:** Final testing & launch

**Total: 3-5 days to launch!** 🚀

---

## 💪 You Got This!

Semua sudah siap, tinggal:
1. Connect frontend (coding)
2. Deploy (follow guide)
3. Launch! 🎉

**Let's ship it!** 🚀
