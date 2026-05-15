# DOUBLEULINK - System Architecture

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                    (React + Vite + Tailwind)                 │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Landing Page │  │ Login/Signup │  │  Dashboard   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Profile Page │  │  Sample Page │  │  Admin Page  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         API Client (src/lib/api.js)                │    │
│  │         Auth Context (src/contexts/AuthContext.jsx)│    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTPS (JWT Token)
                       │
┌──────────────────────▼───────────────────────────────────────┐
│                         NGINX                                 │
│                    (Reverse Proxy + SSL)                      │
│                                                               │
│  ┌─────────────────────┐      ┌─────────────────────┐       │
│  │  yourdomain.com     │      │  api.yourdomain.com │       │
│  │  (Frontend Static)  │      │  (Backend API)      │       │
│  └─────────────────────┘      └──────────┬──────────┘       │
└───────────────────────────────────────────┼───────────────────┘
                                            │
┌───────────────────────────────────────────▼───────────────────┐
│                      BACKEND API                               │
│                  (Node.js + Express)                           │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Auth Routes  │  │Profile Routes│  │ Link Routes  │       │
│  │ /api/auth/*  │  │/api/profiles/*│  │ /api/links/* │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Shop Routes  │  │Analytics Rts │  │Upload Routes │       │
│  │ /api/shop/*  │  │/api/analytics/*│ │/api/upload/* │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                                │
│  ┌────────────────────────────────────────────────────┐      │
│  │         Middleware (JWT, Rate Limit, CORS)         │      │
│  └────────────────────────────────────────────────────┘      │
└──────────────────────┬─────────────────────────────────────────┘
                       │
┌──────────────────────▼─────────────────────────────────────────┐
│                      POSTGRESQL                                 │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  users   │  │ profiles │  │  links   │  │shop_items│      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
│                                                                 │
│  ┌──────────┐  ┌──────────┐                                   │
│  │analytics │  │collections│                                   │
│  └──────────┘  └──────────┘                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      FILE STORAGE                                │
│                   /var/www/doubleulink/uploads/                  │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │   avatars/   │  │     shop/    │                            │
│  └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

### 1. User Registration
```
User → Frontend (LoginPage)
     → api.register(email, password, username)
     → POST /api/auth/register
     → Backend validates input
     → Check email/username availability
     → Hash password (bcrypt)
     → Insert into users table
     → Insert into profiles table
     → Generate JWT token
     → Return token + user data
     → Frontend stores token in localStorage
     → Redirect to dashboard
```

### 2. User Login
```
User → Frontend (LoginPage)
     → api.login(email, password)
     → POST /api/auth/login
     → Backend finds user by email
     → Verify password (bcrypt)
     → Generate JWT token
     → Return token + user data
     → Frontend stores token
     → Redirect to dashboard
```

### 3. Load Dashboard
```
User → Frontend (DashboardPage)
     → api.getMyProfile()
     → GET /api/profiles/me/profile
     → Backend verifies JWT token
     → Query profile, links, shop_items
     → Return data
     → Frontend displays in editor
```

### 4. Update Profile
```
User edits → Frontend (DashboardPage)
          → api.updateProfile(data)
          → PUT /api/profiles/me/profile
          → Backend verifies JWT
          → Update profiles table
          → Return updated profile
          → Frontend updates UI
```

### 5. Create Link
```
User clicks "Add Link" → Frontend
                       → api.createLink(data)
                       → POST /api/links
                       → Backend verifies JWT
                       → Insert into links table
                       → Return new link
                       → Frontend adds to list
```

### 6. View Public Profile
```
Visitor → Frontend (ProfilePage)
        → api.getPublicProfile(username)
        → GET /api/profiles/:username
        → Backend queries profile, links, shop_items
        → Track view in analytics table
        → Increment view_count
        → Return data
        → Frontend displays profile
```

### 7. Track Link Click
```
Visitor clicks link → Frontend
                    → api.trackLinkClick(linkId)
                    → POST /api/links/:id/click
                    → Backend inserts into analytics
                    → Increment link click_count
                    → Increment profile click_count
                    → Return success
                    → Frontend redirects to URL
```

### 8. Upload Avatar
```
User selects file → Frontend
                  → api.uploadAvatar(file)
                  → POST /api/upload/avatar (multipart/form-data)
                  → Backend validates file
                  → Resize to 400x400
                  → Convert to WebP
                  → Save to /uploads/avatars/
                  → Return URL
                  → Frontend updates avatar_url
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1: Firewall (UFW)                                 │
│ - Only ports 22, 80, 443 open                           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 2: Nginx                                          │
│ - SSL/TLS encryption (HTTPS)                            │
│ - Rate limiting                                         │
│ - Security headers                                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 3: Express Middleware                             │
│ - Helmet (security headers)                             │
│ - CORS (origin whitelist)                               │
│ - Rate limiting (100 req/15min, 5 auth/15min)          │
│ - Body size limit                                       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 4: Authentication                                 │
│ - JWT token verification                                │
│ - Password hashing (bcrypt, 10 rounds)                  │
│ - Token expiration (7 days)                             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 5: Input Validation                               │
│ - Email format validation                               │
│ - Username format validation                            │
│ - Password length check                                 │
│ - File type validation                                  │
│ - File size validation                                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 6: Database                                       │
│ - Parameterized queries (SQL injection protection)     │
│ - Row-level security (user can only edit own data)     │
│ - Foreign key constraints                               │
└─────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

```
users
├── id (PK)
├── email (UNIQUE)
├── password_hash
├── created_at
└── updated_at

profiles
├── id (PK)
├── user_id (FK → users.id) (UNIQUE)
├── username (UNIQUE)
├── display_name
├── bio
├── avatar_url
├── instagram_url
├── twitter_url
├── pinterest_url
├── theme_id
├── wallpaper_style
├── wallpaper_color
├── wallpaper_animation
├── card_bg_style
├── card_bg_color
├── card_bg_gradient
├── spacing_mode
├── spacing_value
├── spacing_top/bottom/left/right
├── global_font
├── global_color
├── title_size
├── corner_radius
├── view_count
├── click_count
├── created_at
└── updated_at

links
├── id (PK)
├── profile_id (FK → profiles.id)
├── label
├── url
├── icon
├── position
├── custom_font
├── custom_color
├── click_count
├── is_active
├── created_at
└── updated_at

shop_items
├── id (PK)
├── profile_id (FK → profiles.id)
├── name
├── price
├── badge
├── url
├── image_url
├── bg_color
├── fg_color
├── position
├── click_count
├── is_active
├── created_at
└── updated_at

analytics
├── id (PK)
├── profile_id (FK → profiles.id)
├── link_id (FK → links.id, nullable)
├── shop_item_id (FK → shop_items.id, nullable)
├── event_type (view, link_click, shop_click)
├── ip_address
├── user_agent
├── referrer
└── created_at
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CONTABO VPS                           │
│                   Ubuntu 22.04 LTS                       │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ PM2 (Process Manager)                          │    │
│  │ - Auto-restart on crash                        │    │
│  │ - Log management                               │    │
│  │ - Cluster mode (optional)                      │    │
│  │                                                 │    │
│  │  ┌──────────────────────────────────────┐     │    │
│  │  │ Node.js App (Port 3001)              │     │    │
│  │  │ - Express server                     │     │    │
│  │  │ - API routes                         │     │    │
│  │  └──────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ Nginx (Port 80/443)                            │    │
│  │ - Reverse proxy to Node.js                     │    │
│  │ - Serve static files (frontend)                │    │
│  │ - SSL termination                              │    │
│  │ - Gzip compression                             │    │
│  │ - Caching                                      │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ PostgreSQL (Port 5432)                         │    │
│  │ - Only localhost access                        │    │
│  │ - Automatic backups                            │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ File System                                    │    │
│  │ /var/www/doubleulink/                          │    │
│  │ ├── server/          (Backend code)            │    │
│  │ ├── frontend/        (Built React app)         │    │
│  │ └── uploads/         (User uploads)            │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ Let's Encrypt (Certbot)                        │    │
│  │ - Free SSL certificates                        │    │
│  │ - Auto-renewal                                 │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 📈 Scalability

### Current Setup (Single Server)
- **Capacity:** ~1000 concurrent users
- **Cost:** €8-12/month
- **Good for:** MVP, small-medium traffic

### Future Scaling Options

#### Option 1: Vertical Scaling
- Upgrade VPS (8GB RAM, 4 CPU)
- **Capacity:** ~5000 concurrent users
- **Cost:** €15-25/month

#### Option 2: Horizontal Scaling
```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                         │
│                      (Nginx)                             │
└──────────┬──────────────────────┬────────────────────────┘
           │                      │
┌──────────▼──────────┐  ┌───────▼──────────┐
│   App Server 1      │  │  App Server 2    │
│   (PM2 Cluster)     │  │  (PM2 Cluster)   │
└──────────┬──────────┘  └───────┬──────────┘
           │                      │
           └──────────┬───────────┘
                      │
           ┌──────────▼──────────┐
           │  PostgreSQL Master  │
           │  + Read Replicas    │
           └─────────────────────┘
```

#### Option 3: Cloud Migration
- Move to AWS/GCP/Azure
- Use managed services (RDS, S3, CloudFront)
- Auto-scaling
- **Cost:** $50-200/month

---

## 🔄 CI/CD Pipeline (Future)

```
Developer → Git Push → GitHub
                         ↓
                    GitHub Actions
                         ↓
                  ┌──────┴──────┐
                  │             │
            Run Tests      Build Frontend
                  │             │
                  └──────┬──────┘
                         ↓
                  Deploy to Server
                         ↓
                    PM2 Restart
                         ↓
                  Health Check
                         ↓
                    ✅ Success
```

---

## 📊 Monitoring Stack (Future)

```
┌─────────────────────────────────────────────────────────┐
│                    Monitoring                            │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │   PM2      │  │  Nginx     │  │ PostgreSQL │       │
│  │   Logs     │  │  Logs      │  │   Logs     │       │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘       │
│        │               │               │               │
│        └───────────────┼───────────────┘               │
│                        │                               │
│                  ┌─────▼──────┐                        │
│                  │   Grafana  │                        │
│                  │ (Dashboard)│                        │
│                  └────────────┘                        │
└─────────────────────────────────────────────────────────┘
```

---

**Architecture Version:** 1.0  
**Last Updated:** May 14, 2026  
**Status:** Production Ready ✅
