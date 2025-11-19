# 🚀 Complete Deployment Guide
## AI & ML Club OCT Website

This guide will help you deploy your website to GitHub Pages and configure all services.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Google Drive API Setup](#google-drive-api-setup)
4. [Email Configuration](#email-configuration)
5. [Backend Deployment](#backend-deployment)
6. [Custom Domain Setup](#custom-domain-setup)
7. [Testing & Verification](#testing--verification)

---

## 1. Prerequisites

- GitHub account
- Google Cloud account (for Drive API)
- Gmail account (for form notifications)
- Git installed on your computer

---

## 2. GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `website` or `aiml-club-website`
3. Keep it **Public** (required for free GitHub Pages)
4. Don't initialize with README (we have files)
5. Click "Create repository"

### Step 2: Push Code to GitHub

Open terminal in project folder:

```bash
# Navigate to project folder
cd "d:\CLub v2\aiml-club-website"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI & ML Club website"

# Add remote repository (replace with your username)
git remote add origin https://github.com/aimlcluboct/website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under "Source":
   - Branch: `main`
   - Folder: `/` (root)
5. Click **Save**
6. Wait 2-3 minutes
7. Your site will be live at: `https://aimlcluboct.github.io/website/`

### Step 4: Verify Deployment

Visit your GitHub Pages URL and verify:
- ✅ Website loads correctly
- ✅ Images display properly
- ✅ Navigation works
- ✅ All sections visible
- ✅ Responsive on mobile

---

## 3. Google Drive API Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Project name: `AIML Club Website`
4. Click "Create"

### Step 2: Enable Google Drive API

1. In Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Drive API"
3. Click on it and click **Enable**

### Step 3: Create API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the API key (save it somewhere safe)
4. Click **Restrict Key** (recommended)
5. Under "API restrictions":
   - Select "Restrict key"
   - Choose "Google Drive API"
6. Under "Application restrictions" (optional):
   - Select "HTTP referrers"
   - Add: `https://aimlcluboct.github.io/*`
7. Click **Save**

### Step 4: Configure Gallery

1. Open `html-version/js/gallery.js`
2. Find line with `apiKey: 'YOUR_GOOGLE_API_KEY_HERE'`
3. Replace with your actual API key:
   ```javascript
   apiKey: 'AIzaSyC..._your_actual_key',
   ```
4. Save file
5. Commit and push:
   ```bash
   git add html-version/js/gallery.js
   git commit -m "Add Google Drive API key"
   git push
   ```

### Step 5: Make Drive Folders Public

1. Open Google Drive
2. Navigate to your gallery folder
3. Right-click → Share → Get link
4. Change to "Anyone with the link can view"
5. Click "Copy link"
6. Repeat for media folder

---

## 4. Email Configuration

### Option A: Using Gmail with Backend (Recommended)

See [Backend Deployment](#backend-deployment) section.

### Option B: Using Formspree (No Backend)

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for free account
3. Create new form
4. Copy form endpoint URL
5. Update form in `html-version/index.html`:
   ```html
   <form id="join-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option C: Using EmailJS (Client-side)

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Create account and email service
3. Create email template
4. Get Service ID, Template ID, and Public Key
5. Add EmailJS SDK to your HTML:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
6. Update form handling in `js/app.js`

---

## 5. Backend Deployment

### Option A: Heroku (Free Tier)

1. **Create Heroku account**: https://heroku.com
2. **Install Heroku CLI**:
   ```bash
   # Windows (using Chocolatey)
   choco install heroku-cli
   ```
3. **Deploy**:
   ```bash
   cd backend
   heroku login
   heroku create aiml-club-backend
   heroku config:set GOOGLE_API_KEY=your_key
   heroku config:set EMAIL_USER=aimlcluboct@gmail.com
   heroku config:set EMAIL_PASS=your_app_password
   git init
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```
4. **Note backend URL**: `https://aiml-club-backend.herokuapp.com`

### Option B: Railway (Recommended)

1. Go to [Railway.app](https://railway.app/)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose `backend` folder
6. Add environment variables in dashboard:
   - `GOOGLE_API_KEY`
   - `EMAIL_USER`
   - `EMAIL_PASS`
7. Deploy and note the URL

### Option C: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy:
   ```bash
   cd backend
   vercel
   ```
3. Follow prompts
4. Add environment variables in Vercel dashboard

### Update Frontend to Use Backend

1. Open `html-version/js/app.js`
2. Update form submission to use your backend URL:
   ```javascript
   const response = await fetch('https://your-backend-url.com/api/join', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
   });
   ```

---

## 6. Custom Domain Setup

### Step 1: Purchase Domain (Optional)

Purchase from:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

Example: `aimlclub.tech`

### Step 2: Configure DNS

Add these DNS records:

```
Type: A
Name: @
Value: 185.199.108.153
```

```
Type: A
Name: @
Value: 185.199.109.153
```

```
Type: A
Name: @
Value: 185.199.110.153
```

```
Type: A
Name: @
Value: 185.199.111.153
```

```
Type: CNAME
Name: www
Value: aimlcluboct.github.io
```

### Step 3: Configure GitHub Pages

1. Go to repository Settings → Pages
2. Under "Custom domain", enter: `aimlclub.tech`
3. Check "Enforce HTTPS"
4. Wait for DNS check to complete (may take 24 hours)

---

## 7. Testing & Verification

### ✅ Pre-Launch Checklist

- [ ] Website loads on GitHub Pages
- [ ] All images display correctly
- [ ] Navigation menu works
- [ ] Smooth scrolling functional
- [ ] Gallery images load from Drive
- [ ] Form submission works
- [ ] Email notifications received
- [ ] Mobile responsive design works
- [ ] All links are correct
- [ ] Footer links work
- [ ] Team photos display
- [ ] Events timeline visible
- [ ] No console errors

### Test on Multiple Devices

- [ ] Desktop (Chrome, Firefox, Edge)
- [ ] Laptop (different screen size)
- [ ] Tablet (iPad, Android)
- [ ] Mobile (iOS, Android)

### Performance Testing

1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your URL
3. Aim for score > 90
4. Fix any issues reported

### SEO Testing

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Submit sitemap (if created)
4. Check for issues

---

## 🚨 Troubleshooting

### Gallery Not Loading

**Issue**: Images not showing from Google Drive

**Solutions**:
1. Verify API key is correct
2. Check folder permissions (must be public)
3. Look at browser console for errors
4. Verify folder IDs match
5. Check API quota hasn't been exceeded

### Form Not Submitting

**Issue**: Form submission fails

**Solutions**:
1. Check backend is running
2. Verify backend URL is correct
3. Check CORS configuration
4. Look at browser network tab
5. Verify email credentials

### Website Not Deploying

**Issue**: GitHub Pages shows 404

**Solutions**:
1. Wait 5 minutes (deployment takes time)
2. Check branch is set to `main`
3. Verify folder is set to `/` (root)
4. Clear browser cache
5. Check repository is public

### Images Not Loading

**Issue**: Logo or photos not showing

**Solutions**:
1. Check file paths are correct
2. Verify images exist in `images` folder
3. Check file names match exactly
4. Try hard refresh (Ctrl+F5)

---

## 📞 Support

If you encounter issues:

1. **Check Console**: Press F12 → Console tab
2. **Check Network**: F12 → Network tab
3. **Read Error Messages**: Copy exact error text
4. **Contact**:
   - Email: aimlcluboct@gmail.com
   - GitHub Issues: Create issue in repository

---

## 🎉 Success!

Once everything is working:

1. ✅ Share website URL with club members
2. ✅ Update social media with new website
3. ✅ Add website to email signatures
4. ✅ Submit to college website
5. ✅ Share on LinkedIn, Instagram
6. ✅ Update WhatsApp channel description

---

## 📚 Additional Resources

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Google Drive API Docs](https://developers.google.com/drive/api/v3/about-sdk)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

---

**Built with ❤️ by AI & ML Club OCT**  
*Innovate • Implement • Inspire*
