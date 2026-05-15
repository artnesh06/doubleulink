# DOUBLEULINK Backend API

RESTful API for DOUBLEULINK - Link in bio platform.

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **File Upload**: Multer + Sharp
- **Process Manager**: PM2

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/check-username/:username` - Check username availability

### Profiles
- `GET /api/profiles/:username` - Get public profile (no auth)
- `GET /api/profiles/me/profile` - Get own profile (auth required)
- `PUT /api/profiles/me/profile` - Update profile (auth required)

### Links
- `POST /api/links` - Create link (auth required)
- `PUT /api/links/:id` - Update link (auth required)
- `DELETE /api/links/:id` - Delete link (auth required)
- `PUT /api/links/reorder` - Reorder links (auth required)
- `POST /api/links/:id/click` - Track link click (no auth)

### Shop
- `POST /api/shop` - Create shop item (auth required)
- `PUT /api/shop/:id` - Update shop item (auth required)
- `DELETE /api/shop/:id` - Delete shop item (auth required)
- `PUT /api/shop/reorder` - Reorder shop items (auth required)
- `POST /api/shop/:id/click` - Track shop click (no auth)

### Analytics
- `GET /api/analytics/summary?days=30` - Get analytics summary (auth required)
- `GET /api/analytics/detailed` - Get detailed analytics (auth required)

### Upload
- `POST /api/upload/avatar` - Upload avatar (auth required)
- `POST /api/upload/shop-image` - Upload shop image (auth required)

## Local Development

### Prerequisites
- Node.js 20+
- PostgreSQL 14+

### Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create database:
```bash
sudo -u postgres psql
CREATE DATABASE doubleulink;
CREATE USER doubleulink_user WITH PASSWORD 'dev_password';
GRANT ALL PRIVILEGES ON DATABASE doubleulink TO doubleulink_user;
\q
```

3. Import schema:
```bash
sudo -u postgres psql doubleulink < src/database/schema.sql
```

4. Create `.env` file:
```bash
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

JWT_SECRET=dev_secret_min_32_characters_long
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173

UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

5. Start server:
```bash
npm run dev
```

Server runs on http://localhost:3001

## Testing API

### Register
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Profile (with token)
```bash
curl http://localhost:3001/api/profiles/me/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Profile
```bash
curl -X PUT http://localhost:3001/api/profiles/me/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "Test User",
    "bio": "This is my bio",
    "themeId": "dark"
  }'
```

### Create Link
```bash
curl -X POST http://localhost:3001/api/links \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "My Website",
    "url": "https://example.com",
    "icon": "instagram"
  }'
```

## Database Schema

See `src/database/schema.sql` for full schema.

### Main Tables:
- `users` - User accounts (email, password)
- `profiles` - User profiles (username, bio, settings)
- `links` - User links
- `shop_items` - Shop items
- `analytics` - Click tracking

## Security Features

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Rate limiting
- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Input validation
- ✅ SQL injection protection (parameterized queries)
- ✅ File upload validation

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment guide to Contabo VPS.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_NAME` | Database name | doubleulink |
| `DB_USER` | Database user | - |
| `DB_PASSWORD` | Database password | - |
| `JWT_SECRET` | JWT secret key (min 32 chars) | - |
| `JWT_EXPIRES_IN` | JWT expiration | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | - |
| `UPLOAD_DIR` | Upload directory | ./uploads |
| `MAX_FILE_SIZE` | Max file size in bytes | 5242880 |

## License

MIT
