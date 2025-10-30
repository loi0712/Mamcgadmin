# 🚀 DEPLOYMENT GUIDE

**MAMCG Admin Interface - Production Deployment**

This guide covers deploying the MAMCG Admin Interface to production environments.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Build Process](#build-process)
4. [Deployment Options](#deployment-options)
5. [Backend Integration](#backend-integration)
6. [Security Configuration](#security-configuration)
7. [Performance Optimization](#performance-optimization)
8. [Monitoring & Logging](#monitoring--logging)
9. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

### **Required:**
- Node.js 18+ or Bun runtime
- Web server (Nginx, Apache, or cloud provider)
- SSL certificate (for HTTPS)
- Backend API server (optional for initial deployment)

### **Recommended:**
- CDN for static assets
- Load balancer (for high traffic)
- Monitoring service (DataDog, New Relic, etc.)
- Error tracking (Sentry, Rollbar, etc.)

---

## 🔧 Environment Setup

### **1. Create Environment Files**

Create `.env.production`:

```bash
# API Configuration
VITE_API_URL=https://api.mamcg.vn
VITE_API_TIMEOUT=30000

# Authentication
VITE_AUTH_ENABLED=true
VITE_SESSION_TIMEOUT=3600000

# Features
VITE_LDAP_ENABLED=true
VITE_WORKFLOW_ENABLED=true
VITE_CG_SERVER_ENABLED=true

# Monitoring
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# App Info
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=MAMCG Admin
```

### **2. Environment Variables Explained**

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |
| `VITE_API_TIMEOUT` | API request timeout (ms) | No |
| `VITE_AUTH_ENABLED` | Enable authentication | Yes |
| `VITE_SESSION_TIMEOUT` | Session timeout (ms) | No |
| `VITE_LDAP_ENABLED` | Enable LDAP integration | No |
| `VITE_SENTRY_DSN` | Sentry error tracking | No |

---

## 🏗️ Build Process

### **Option 1: Standard Build (npm)**

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Output: /dist directory
```

### **Option 2: Bun Build (Faster)**

```bash
# Install dependencies
bun install

# Run production build
bun run build

# Output: /dist directory
```

### **Build Output Structure**

```
/dist
├── index.html              # Entry HTML
├── /assets
│   ├── index-[hash].js     # Main JS bundle
│   ├── index-[hash].css    # Main CSS bundle
│   └── [other-assets]
└── [other files]
```

### **Build Optimization**

Enable optimization in `vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,    // Remove console.logs
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['./components/ui/*']
        }
      }
    }
  }
});
```

---

## 🌐 Deployment Options

### **Option 1: Nginx (Recommended)**

#### **1. Install Nginx**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### **2. Configure Nginx**

Create `/etc/nginx/sites-available/mamcg-admin`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name admin.mamcg.vn;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name admin.mamcg.vn;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/mamcg.crt;
    ssl_certificate_key /etc/ssl/private/mamcg.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Root directory
    root /var/www/mamcg-admin/dist;
    index index.html;

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Main location
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Proxy (Optional)
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Logs
    access_log /var/log/nginx/mamcg-admin-access.log;
    error_log /var/log/nginx/mamcg-admin-error.log;
}
```

#### **3. Enable Site**

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/mamcg-admin /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### **4. Deploy Files**

```bash
# Copy build to server
scp -r dist/* user@server:/var/www/mamcg-admin/dist/

# Set permissions
sudo chown -R www-data:www-data /var/www/mamcg-admin
sudo chmod -R 755 /var/www/mamcg-admin
```

---

### **Option 2: Apache**

#### **1. Configure Apache**

Create `/etc/apache2/sites-available/mamcg-admin.conf`:

```apache
<VirtualHost *:80>
    ServerName admin.mamcg.vn
    Redirect permanent / https://admin.mamcg.vn/
</VirtualHost>

<VirtualHost *:443>
    ServerName admin.mamcg.vn
    DocumentRoot /var/www/mamcg-admin/dist

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/mamcg.crt
    SSLCertificateKeyFile /etc/ssl/private/mamcg.key

    <Directory /var/www/mamcg-admin/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # SPA fallback
        FallbackResource /index.html
    </Directory>

    # Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
    </IfModule>

    # Cache headers
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/gif "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType text/css "access plus 1 month"
        ExpiresByType application/javascript "access plus 1 month"
    </IfModule>

    ErrorLog ${APACHE_LOG_DIR}/mamcg-admin-error.log
    CustomLog ${APACHE_LOG_DIR}/mamcg-admin-access.log combined
</VirtualHost>
```

#### **2. Enable Site**

```bash
# Enable modules
sudo a2enmod ssl
sudo a2enmod rewrite
sudo a2enmod expires
sudo a2enmod headers

# Enable site
sudo a2ensite mamcg-admin

# Restart Apache
sudo systemctl restart apache2
```

---

### **Option 3: Vercel (Cloud)**

#### **1. Install Vercel CLI**

```bash
npm i -g vercel
```

#### **2. Deploy**

```bash
# Login
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add VITE_API_URL production
```

#### **3. Vercel Configuration**

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

### **Option 4: Netlify**

#### **1. Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### **2. Deploy**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

### **Option 5: AWS S3 + CloudFront**

#### **1. Build Application**

```bash
npm run build
```

#### **2. Create S3 Bucket**

```bash
aws s3 mb s3://mamcg-admin
```

#### **3. Upload to S3**

```bash
aws s3 sync dist/ s3://mamcg-admin --delete
```

#### **4. Configure CloudFront**

- Create CloudFront distribution
- Point to S3 bucket
- Configure custom error response: 404 → /index.html
- Enable HTTPS with ACM certificate

---

## 🔗 Backend Integration

### **1. Configure API Endpoint**

Update `/lib/api/client.ts`:

```typescript
const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.mamcg.vn';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth interceptor
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### **2. CORS Configuration (Backend)**

Configure backend to allow frontend domain:

```javascript
// Express.js example
app.use(cors({
  origin: 'https://admin.mamcg.vn',
  credentials: true
}));
```

### **3. Test Integration**

```bash
# Test API connectivity
curl https://api.mamcg.vn/health

# Expected response:
# { "status": "ok" }
```

---

## 🔒 Security Configuration

### **1. Content Security Policy**

Add to Nginx/Apache:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.mamcg.vn;" always;
```

### **2. Environment Variables Security**

```bash
# Never commit .env files
echo ".env*" >> .gitignore

# Use secret management
# - AWS Secrets Manager
# - Azure Key Vault
# - HashiCorp Vault
```

### **3. Authentication Setup**

```typescript
// Implement JWT token refresh
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Refresh token logic
      const newToken = await refreshToken();
      localStorage.setItem('auth_token', newToken);
      
      // Retry original request
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return apiClient.request(error.config);
    }
    return Promise.reject(error);
  }
);
```

---

## ⚡ Performance Optimization

### **1. Enable Compression**

Already configured in Nginx/Apache examples above.

### **2. CDN Configuration**

Use CDN for static assets:

```typescript
// vite.config.ts
export default defineConfig({
  base: 'https://cdn.mamcg.vn/',
  build: {
    assetsDir: 'assets'
  }
});
```

### **3. Code Splitting**

```typescript
// Lazy load routes
const DashboardView = lazy(() => import('./components/admin/DashboardView'));
const UsersView = lazy(() => import('./components/admin/UsersView'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/dashboard" element={<DashboardView />} />
    <Route path="/users" element={<UsersView />} />
  </Routes>
</Suspense>
```

### **4. Image Optimization**

```bash
# Optimize images before deployment
npm install -g imagemin-cli

imagemin assets/*.{jpg,png} --out-dir=dist/assets
```

---

## 📊 Monitoring & Logging

### **1. Error Tracking with Sentry**

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: 'production',
  tracesSampleRate: 1.0,
});
```

### **2. Analytics with Google Analytics**

```typescript
// utils/analytics.ts
export const trackPageView = (path: string) => {
  if (window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
      page_path: path
    });
  }
};
```

### **3. Application Monitoring**

```bash
# Server monitoring
sudo apt install netdata

# Log monitoring
sudo apt install logrotate

# Configure log rotation
/var/log/nginx/mamcg-admin-*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
}
```

---

## 🐛 Troubleshooting

### **Common Issues**

#### **1. Blank Page After Deployment**

**Cause:** Incorrect base path  
**Solution:** Check `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/'  // For root domain
  // OR
  base: '/admin/'  // For subdirectory
});
```

#### **2. API Requests Failing**

**Cause:** CORS or incorrect API URL  
**Solution:**
- Verify `VITE_API_URL` in `.env.production`
- Check backend CORS configuration
- Verify SSL certificates

#### **3. 404 on Refresh**

**Cause:** Server not configured for SPA  
**Solution:** Ensure server rewrites all routes to `/index.html`

#### **4. Assets Not Loading**

**Cause:** Incorrect asset paths  
**Solution:**
```typescript
// Use absolute paths
import logo from '/assets/logo.png';
// Not relative paths
import logo from './assets/logo.png';
```

### **Debugging Commands**

```bash
# Check Nginx configuration
sudo nginx -t

# View Nginx logs
tail -f /var/log/nginx/mamcg-admin-error.log

# Check build output
ls -la dist/

# Test API connectivity
curl -I https://api.mamcg.vn

# Check SSL certificate
openssl s_client -connect admin.mamcg.vn:443
```

---

## 📝 Deployment Checklist

- [ ] Build application (`npm run build`)
- [ ] Test build locally (`npm run preview`)
- [ ] Set production environment variables
- [ ] Configure web server (Nginx/Apache)
- [ ] Upload files to server
- [ ] Configure SSL certificate
- [ ] Test all routes
- [ ] Verify API connectivity
- [ ] Check CORS configuration
- [ ] Enable compression
- [ ] Configure caching headers
- [ ] Set up error tracking
- [ ] Configure monitoring
- [ ] Test authentication flow
- [ ] Verify all features work
- [ ] Check mobile responsiveness
- [ ] Performance audit
- [ ] Security audit
- [ ] Update DNS (if needed)

---

## 🎯 Post-Deployment

### **1. Smoke Testing**

```bash
# Test critical paths
- Login
- Dashboard load
- User CRUD operations
- Workflow execution
- File upload/download
```

### **2. Performance Monitoring**

Use Lighthouse or WebPageTest:

```bash
# Run Lighthouse
lighthouse https://admin.mamcg.vn --view

# Target scores:
# Performance: >90
# Accessibility: >95
# Best Practices: >95
# SEO: >90
```

### **3. Backup Strategy**

```bash
# Backup database (if applicable)
# Backup configuration files
# Backup SSL certificates
# Document rollback procedure
```

---

## 🔄 Updates & Maintenance

### **Deploying Updates**

```bash
# 1. Build new version
npm run build

# 2. Backup current version
cp -r /var/www/mamcg-admin/dist /var/www/mamcg-admin/dist.backup

# 3. Deploy new version
scp -r dist/* user@server:/var/www/mamcg-admin/dist/

# 4. Clear CDN cache (if using)
# 5. Verify deployment
# 6. Monitor for errors
```

### **Rollback Procedure**

```bash
# Restore backup
rm -rf /var/www/mamcg-admin/dist
mv /var/www/mamcg-admin/dist.backup /var/www/mamcg-admin/dist

# Restart web server
sudo systemctl restart nginx
```

---

## 📞 Support

For deployment support:
- **Email:** devops@mamcg.vn
- **Documentation:** See `/docs` folder
- **Emergency:** On-call rotation

---

**Last Updated:** October 30, 2025  
**Version:** 1.0.0  
**Status:** Production Ready
