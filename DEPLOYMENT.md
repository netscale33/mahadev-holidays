# Mahadev Holidays — Deployment Guide

## Prerequisites

- **Node.js** 20.x or later (LTS recommended)
- **npm** 10.x or later (ships with Node.js)
- **MongoDB** 7.x or later (local or Atlas)
- **Git** (for version control)
- **A Vercel account** (for Vercel deployment) or **a Linux VPS** (for traditional deployment)

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

| Variable | Required | Default | Description |
|---|---|---|---|
| `MONGODB_URI` | Yes | — | MongoDB connection string (e.g. `mongodb://localhost:27017/mahadev-holidays` or Atlas SRV string) |
| `JWT_SECRET` | Yes | — | Secret key used to sign and verify JWT tokens (min 32 chars recommended) |
| `ADMIN_USERNAME` | Yes | — | Super-admin login username (used for admin panel, checked before DB lookup) |
| `ADMIN_PASSWORD` | Yes | — | Super-admin login password |
| `NEXT_PUBLIC_SITE_URL` | Yes | `http://localhost:3000` | Public root URL of the site (used for sitemaps, canonical URLs, OG tags) |
| `NEXT_PUBLIC_SITE_NAME` | No | `Mahadev Holidays` | Display name used in meta tags and UI |

### Example `.env.local`

```env
MONGODB_URI=mongodb://localhost:27017/mahadev-holidays
JWT_SECRET=a-strong-random-secret-string-at-least-32-chars-long
ADMIN_USERNAME=@vishalchouhan
ADMIN_PASSWORD=a-strong-password
NEXT_PUBLIC_SITE_URL=https://mahadevholidays.com
NEXT_PUBLIC_SITE_NAME=Mahadev Holidays
```

---

## Local Development Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd vshl-luxury-travel

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.local.example .env.local
# Edit .env.local with your local values

# 4. Start MongoDB (if using local)
mongod --dbpath /data/db

# 5. Run the development server
npm run dev
```

The site will be available at `http://localhost:3000`.

---

## Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

The production server runs on port `3000` by default. Set the `PORT` environment variable to change it.

---

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the official Next.js deployment platform and provides the simplest deployment experience.

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Configure environment variables in the Vercel project settings (all variables from the table above).
4. Deploy — Vercel detects Next.js automatically and runs `next build`.

**Additional Vercel configuration** (`vercel.json` – optional):

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

**Note**: Vercel uses serverless functions. Ensure your MongoDB connection supports serverless environments (MongoDB Atlas connection pooling). The `mongooseCache` pattern in `src/lib/db.ts` handles cold starts efficiently.

### Option 2: Traditional VPS (PM2 + Nginx)

#### 1. Server Preparation (Ubuntu/Debian)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install MongoDB (see MongoDB docs for your OS)
# https://www.mongodb.com/docs/manual/installation/
```

#### 2. Deploy the Application

```bash
# Clone or copy the project
git clone <repository-url> /var/www/mahadev-holidays
cd /var/www/mahadev-holidays

# Install dependencies
npm install --production

# Create .env file
nano .env.local
# Paste all environment variables

# Build
npm run build
```

#### 3. PM2 Configuration

Create `ecosystem.config.js`:

```js
module.exports = {
  apps: [
    {
      name: 'mahadev-holidays',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 2,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
```

```bash
# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. Nginx Reverse Proxy

Create `/etc/nginx/sites-available/mahadev-holidays`:

```nginx
server {
    listen 80;
    server_name mahadevholidays.com www.mahadevholidays.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mahadevholidays.com www.mahadevholidays.com;

    ssl_certificate /etc/letsencrypt/live/mahadevholidays.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mahadevholidays.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript image/svg+xml;
    gzip_min_length 1000;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets cache
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /static {
        proxy_pass http://127.0.0.1:3000;
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/mahadev-holidays /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d mahadevholidays.com -d www.mahadevholidays.com
```

---

## MongoDB Setup

### Option A: MongoDB Atlas (Recommended for Production)

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Under **Database Access**, create a database user with read/write privileges.
3. Under **Network Access**, whitelist your deployment IPs (for Vercel, use `0.0.0.0/0` to allow all — Atlas manages network security via IP whitelisting).
4. Click **Connect** → **Connect your application** and copy the SRV connection string.
5. Replace `<password>` with your user's password and update `MONGODB_URI` in your environment.

### Option B: Local MongoDB

```bash
# Windows (with MongoDB installed)
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath C:\data\db

# Linux / macOS
mongod --dbpath /data/db
```

### Initial Data Setup

After MongoDB is running, start the app and create an admin user via one of the API endpoints, or use a MongoDB GUI (Compass, Robo 3T) to seed data.

---

## Database Indexing

The following indexes are defined in the schema and ensure query performance:

| Collection | Indexes |
|---|---|
| `destinations` | `slug:1` (unique), `category:1`, `isFeatured:1`, `isPopular:1` |
| `bookings` | `email:1`, `status:1`, `createdAt:-1` |
| `testimonials` | `isApproved:1`, `isFeatured:1` |
| `blogposts` | `slug:1` (unique), `isPublished:1 + publishedAt:-1`, `category:1` |
| `contacts` | `isRead:1`, `createdAt:-1` |
| `newsletters` | `email:1` (unique), `isActive:1` |
| `users` | `email:1` (unique), `username:1` (unique) |

Indexes are automatically created by Mongoose when the application starts. In production, consider creating them manually for more control:

```js
db.destinations.createIndex({ slug: 1 }, { unique: true });
db.destinations.createIndex({ category: 1 });
db.destinations.createIndex({ isFeatured: 1 });
db.destinations.createIndex({ isPopular: 1 });
db.bookings.createIndex({ email: 1 });
db.bookings.createIndex({ status: 1 });
db.bookings.createIndex({ createdAt: -1 });
// ... repeat for all indexes above
```

---

## Security Checklist

- [x] **HTTPS** — Enabled via Let's Encrypt on VPS or automatic on Vercel.
- [x] **JWT Authentication** — Tokens expire after 7 days. Verify on every protected route.
- [x] **Password Hashing** — bcrypt with 12 salt rounds.
- [x] **Security Headers** — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection`, `Referrer-Policy`, `Strict-Transport-Security` configured in `next.config.ts`.
- [ ] **Rate Limiting** — Not implemented by default. Add a rate limiter (e.g. `express-rate-limit` wrapped as middleware or Vercel WAF) to protect login and contact endpoints. Recommended: 5 requests/min for login, 10/min for contact.
- [ ] **Input Sanitization** — MongoDB injection is mitigated by Mongoose's built-in sanitization. For rich text content (blog posts, destination descriptions), sanitize with a library like `dompurify` or `sanitize-html` before rendering.
- [ ] **CORS** — Not exposed as an API for external domains; CORS header management is only needed if you embed the API in third-party apps.
- [ ] **Environment Variable Validation** — The app validates `MONGODB_URI` at startup. Ensure all secrets are rotated periodically.

**Production Security Hardening:**

- Store secrets in a vault or environment manager, never in the codebase.
- Rotate `JWT_SECRET` every 90 days.
- Enable MongoDB Atlas IP whitelisting.
- Set up database backups (Atlas provides automated backups).
- Keep all dependencies updated (`npm audit` regularly).

---

## Performance Optimization Tips

1. **Image Optimization** — Next.js `<Image>` component with `remotePatterns` for Unsplash is already configured. Use WebP/AVIF formats (configured in `next.config.ts`).
2. **Static Generation** — Pages that don't change often (destinations list, blog) can use `generateStaticParams` or ISR with `revalidate`.
3. **Database Query Optimization** — All list endpoints support pagination (`page`, `limit`). Use indexed fields in filters.
4. **CDN Caching** — Vercel provides an edge CDN automatically. On VPS, Nginx caches static assets for 365 days.
5. **Bundle Size** — Framer Motion and Lucide icons are tree-shaken by Next.js. Avoid large libraries.
6. **MongoDB Connection Pooling** — The cached singleton connection pattern in `db.ts` reuses a single connection across hot reloads.
7. **Cluster Mode** — PM2 runs 2 instances in cluster mode on VPS. Scale `instances` to match CPU cores.

---

## Post-Deployment Verification

After deployment, verify the following:

### Public Pages

- [ ] Home page loads at `https://<domain>/`
- [ ] Destinations listing at `/destinations`
- [ ] Individual destination detail pages at `/destinations/<slug>`
- [ ] Blog listing at `/blog`
- [ ] Individual blog posts at `/blog/<slug>`
- [ ] Contact form submission works
- [ ] Newsletter subscription works
- [ ] All images render correctly
- [ ] Responsive layout on mobile/tablet/desktop

### Admin Panel

- [ ] Admin login at `/admin/login` works with credentials from `.env.local`
- [ ] Dashboard loads with correct stats
- [ ] CRUD operations on Destinations, Bookings, Testimonials, Blog
- [ ] Media upload and deletion
- [ ] Customer export CSV downloads
- [ ] Contact message read/unread toggle

### API Endpoints

- [ ] `GET /api/destinations` returns data without auth
- [ ] `POST /api/destinations` requires auth
- [ ] `POST /api/bookings` works without auth (public)
- [ ] `GET /api/stats` returns 401 without token
- [ ] `GET /api/customers?export=csv` downloads a file
- [ ] All endpoints return proper error codes for invalid input

### Error Handling

- [ ] 404 pages render correctly
- [ ] API returns `{ error: "..." }` for bad requests
- [ ] MongoDB connection failures are logged and return 500

---

## Monitoring and Maintenance

### Logging

- Application logs are written to `stdout`/`stderr`. On VPS, PM2 manages log files:
  ```bash
  pm2 logs mahadev-holidays
  pm2 flush mahadev-holidays
  ```
- For production monitoring, consider:
  - **Sentry** — Error tracking (`npm install @sentry/nextjs`)
  - **Logtail** or **Papertrail** — Centralized log management
  - **Datadog / New Relic** — APM and performance monitoring

### Database Backups

- **Atlas**: Automated snapshots every 6 hours (free tier includes 2 days of backup retention).
- **Local**: Use `mongodump`:
  ```bash
  mongodump --uri="$MONGODB_URI" --out=/var/backups/mahadev-$(date +%Y%m%d)
  ```

### Regular Maintenance

| Task | Frequency |
|---|---|
| Update dependencies (`npm update`) | Monthly |
| Rotate JWT secret | Every 90 days |
| Check MongoDB connection pool | Quarterly |
| Review and archive old bookings | Quarterly |
| Check SSL certificate expiry | Monthly |
| Review error logs | Weekly |

### Scaling

- **Vercel**: Upgrade plan for higher bandwidth and serverless function concurrency.
- **VPS**: Increase PM2 instances, add a CDN (Cloudflare), or migrate to a Kubernetes cluster if traffic grows significantly.
