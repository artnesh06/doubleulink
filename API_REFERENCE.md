# DOUBLEULINK API Reference

Base URL: `https://api.yourdomain.com` (production) or `http://localhost:3001` (development)

---

## 🔐 Authentication

All authenticated endpoints require JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📝 Endpoints

### Auth

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "myusername"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "profile": {
      "id": 1,
      "username": "myusername",
      "displayName": "myusername"
    }
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** Same as register

#### Check Username
```http
GET /api/auth/check-username/myusername
```

**Response:**
```json
{
  "available": true
}
```

---

### Profiles

#### Get Public Profile
```http
GET /api/profiles/:username
```

**Response:**
```json
{
  "profile": {
    "id": 1,
    "username": "myusername",
    "display_name": "My Name",
    "bio": "My bio",
    "avatar_url": "https://...",
    "instagram_url": "https://instagram.com/...",
    "twitter_url": "https://x.com/...",
    "pinterest_url": "https://pinterest.com/...",
    "theme_id": "chrome",
    "wallpaper_style": "solid",
    "wallpaper_color": "#1a1a1a",
    "view_count": 100,
    "click_count": 50
  },
  "links": [
    {
      "id": 1,
      "label": "My Website",
      "url": "https://example.com",
      "icon": "instagram",
      "click_count": 10
    }
  ],
  "shopItems": [
    {
      "id": 1,
      "name": "Product 1",
      "price": "0.05 ETH",
      "badge": "NFT",
      "url": "https://...",
      "bg_color": "#1a0a2e",
      "fg_color": "#c77dff"
    }
  ],
  "isOwner": false
}
```

#### Get Own Profile (Auth Required)
```http
GET /api/profiles/me/profile
Authorization: Bearer TOKEN
```

**Response:** Same as public profile but includes all fields

#### Update Profile (Auth Required)
```http
PUT /api/profiles/me/profile
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "displayName": "New Name",
  "bio": "New bio",
  "avatarUrl": "https://...",
  "instagramUrl": "https://instagram.com/...",
  "twitterUrl": "https://x.com/...",
  "pinterestUrl": "https://pinterest.com/...",
  "themeId": "dark",
  "wallpaperStyle": "animated",
  "wallpaperColor": "#000000",
  "wallpaperAnimation": "aurora",
  "cardBgStyle": "gradient",
  "cardBgColor": "#1a1a1a",
  "cardBgGradient": "linear-gradient(...)",
  "spacingMode": "simple",
  "spacingValue": 16,
  "globalFont": "Inter",
  "globalColor": "#ffffff",
  "titleSize": 24,
  "cornerRadius": 16
}
```

**Note:** All fields are optional (COALESCE in SQL)

---

### Links

#### Create Link (Auth Required)
```http
POST /api/links
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "label": "My Website",
  "url": "https://example.com",
  "icon": "instagram",
  "customFont": "Lora",
  "customColor": "#ff0000"
}
```

#### Update Link (Auth Required)
```http
PUT /api/links/:id
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "label": "Updated Label",
  "url": "https://newurl.com",
  "isActive": true
}
```

#### Delete Link (Auth Required)
```http
DELETE /api/links/:id
Authorization: Bearer TOKEN
```

#### Reorder Links (Auth Required)
```http
PUT /api/links/reorder
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "linkIds": [3, 1, 2]
}
```

#### Track Link Click (Public)
```http
POST /api/links/:id/click
```

---

### Shop

#### Create Shop Item (Auth Required)
```http
POST /api/shop
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "Product Name",
  "price": "0.05 ETH",
  "badge": "NFT",
  "url": "https://...",
  "imageUrl": "https://...",
  "bgColor": "#1a0a2e",
  "fgColor": "#c77dff"
}
```

#### Update Shop Item (Auth Required)
```http
PUT /api/shop/:id
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "Updated Name",
  "price": "0.08 ETH",
  "isActive": true
}
```

#### Delete Shop Item (Auth Required)
```http
DELETE /api/shop/:id
Authorization: Bearer TOKEN
```

#### Reorder Shop Items (Auth Required)
```http
PUT /api/shop/reorder
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "itemIds": [2, 1, 3]
}
```

#### Track Shop Click (Public)
```http
POST /api/shop/:id/click
```

---

### Analytics

#### Get Summary (Auth Required)
```http
GET /api/analytics/summary?days=30
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "summary": {
    "totalViews": 1000,
    "totalClicks": 150,
    "clickThroughRate": 15.0
  },
  "topLinks": [
    {
      "id": 1,
      "label": "My Website",
      "url": "https://...",
      "clicks": 50
    }
  ],
  "dailyViews": [
    {
      "date": "2026-05-14",
      "views": 100
    }
  ]
}
```

#### Get Detailed Analytics (Auth Required)
```http
GET /api/analytics/detailed?startDate=2026-05-01&endDate=2026-05-14&limit=100
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "analytics": [
    {
      "id": 1,
      "event_type": "link_click",
      "created_at": "2026-05-14T10:30:00Z",
      "referrer": "https://instagram.com",
      "link_label": "My Website",
      "shop_item_name": null
    }
  ]
}
```

---

### Upload

#### Upload Avatar (Auth Required)
```http
POST /api/upload/avatar
Authorization: Bearer TOKEN
Content-Type: multipart/form-data

avatar: [file]
```

**Response:**
```json
{
  "message": "Avatar uploaded successfully",
  "url": "/uploads/avatars/avatar-1-1715684400000.webp"
}
```

**Full URL:** `https://api.yourdomain.com/uploads/avatars/avatar-1-1715684400000.webp`

#### Upload Shop Image (Auth Required)
```http
POST /api/upload/shop-image
Authorization: Bearer TOKEN
Content-Type: multipart/form-data

image: [file]
```

**Response:**
```json
{
  "message": "Image uploaded successfully",
  "url": "/uploads/shop/shop-1-1715684400000.webp"
}
```

---

## 🔒 Security

### Rate Limiting
- General API: 100 requests per 15 minutes per IP
- Auth endpoints: 5 requests per 15 minutes per IP

### File Upload
- Max size: 5MB
- Allowed types: JPEG, PNG, WebP, GIF
- Auto-resize and optimize to WebP

### CORS
- Configured for frontend domain only
- Credentials enabled

---

## ⚠️ Error Responses

All errors return JSON:
```json
{
  "error": "Error message here"
}
```

**Common Status Codes:**
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `409` - Conflict (duplicate username/email)
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Profile (save token from login)
```bash
TOKEN="your_token_here"
curl http://localhost:3001/api/profiles/me/profile \
  -H "Authorization: Bearer $TOKEN"
```

### Create Link
```bash
curl -X POST http://localhost:3001/api/links \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"label":"My Website","url":"https://example.com"}'
```

### Upload Avatar
```bash
curl -X POST http://localhost:3001/api/upload/avatar \
  -H "Authorization: Bearer $TOKEN" \
  -F "avatar=@/path/to/image.jpg"
```

---

## 📚 Frontend Integration

See `/src/lib/api.js` for ready-to-use API client:

```javascript
import { api } from './lib/api'

// Register
const data = await api.register('email@example.com', 'password', 'username')

// Login
const data = await api.login('email@example.com', 'password')

// Get profile
const profile = await api.getMyProfile()

// Update profile
await api.updateProfile({ displayName: 'New Name' })

// Create link
await api.createLink({ label: 'My Link', url: 'https://...' })

// Upload avatar
const file = event.target.files[0]
const result = await api.uploadAvatar(file)
console.log(result.url) // Use this URL
```

---

**Happy Coding! 🚀**
