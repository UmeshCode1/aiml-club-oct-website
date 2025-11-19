# 🚀 Quick Start Guide
## AI & ML Club OCT Website

Get your website running in 5 minutes!

---

## ⚡ Super Quick Start (Local Testing)

1. **Open the website**:
   - Navigate to: `d:\CLub v2\aiml-club-website\html-version`
   - Double-click `index.html`
   - Website opens in your browser!

2. **That's it!** The website works locally without any setup.

---

## 🌐 Deploy to Internet (GitHub Pages)

### Prerequisites
- GitHub account (create free at github.com)
- Git installed (download from git-scm.com)

### Steps (5 minutes)

1. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Name: `website`
   - Public repository
   - Click "Create repository"

2. **Upload Your Code**:
   ```bash
   # Open PowerShell in project folder
   cd "d:\CLub v2\aiml-club-website"
   
   # Initialize and push
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Click "Pages" in sidebar
   - Source: `main` branch, `/` (root)
   - Click Save
   - Wait 2 minutes

4. **Visit Your Website**:
   - URL: `https://YOUR_USERNAME.github.io/website/`
   - Done! 🎉

---

## 🎨 Customization Guide

### Change Club Information

**File**: `html-version/index.html`

1. **Update Tagline** (Line ~48):
   ```html
   <p class="hero-tagline">
       <span class="tagline-word">Your Word 1</span>
       <span class="tagline-separator">•</span>
       <span class="tagline-word">Your Word 2</span>
   </p>
   ```

2. **Update Description** (Line ~55):
   ```html
   <p class="hero-description">
       Your custom description here...
   </p>
   ```

3. **Update Statistics** (Line ~70):
   ```html
   <div class="stat-item">
       <h3 class="stat-number" data-target="500">0</h3>
       <p class="stat-label">Members</p>
   </div>
   ```

### Change Colors

**File**: `html-version/css/styles.css`

Find `:root` section (Line ~10) and change:
```css
:root {
    --primary-color: #00f5ff;     /* Main cyan color */
    --secondary-color: #00ff88;   /* Green accent */
    --accent-color: #ff00ff;      /* Magenta */
}
```

### Add Team Members

**File**: `html-version/index.html`

Find Team section and add:
```html
<div class="team-card glass-card" data-aos="zoom-in">
    <div class="team-card-inner">
        <div class="team-avatar">
            <div class="avatar-placeholder">
                <i class="fas fa-user"></i>
            </div>
            <div class="avatar-ring"></div>
        </div>
        <h4 class="member-name">Member Name</h4>
        <p class="member-role">Role</p>
        <div class="member-social">
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
        </div>
    </div>
</div>
```

### Add Events

**File**: `html-version/index.html`

Find Events section and add:
```html
<div class="timeline-item" data-aos="fade-right">
    <div class="timeline-dot"></div>
    <div class="timeline-content glass-card">
        <div class="event-date">Month Year</div>
        <h3 class="event-title">Event Name</h3>
        <p class="event-description">Description...</p>
        <div class="event-tags">
            <span class="tag">Tag1</span>
        </div>
    </div>
</div>
```

---

## 🖼️ Add Your Own Images

### Replace Logo

1. Place your logo at: `html-version/images/logo.png`
2. Recommended size: 500x500px, transparent background

### Replace Team Photo

1. Place photo at: `html-version/images/team-photo.jpg`
2. Recommended size: 1920x1080px

### Add Gallery Images

**Option 1: Manual** (Simple)
1. Add images to `html-version/images/gallery/`
2. Update gallery section in HTML

**Option 2: Google Drive** (Auto-updating)
- See [Google Drive Setup](#google-drive-setup) below

---

## 📸 Google Drive Setup (Optional)

For auto-updating gallery from Google Drive:

### Quick Setup

1. **Get API Key** (5 minutes):
   - Go to https://console.cloud.google.com/
   - Create project
   - Enable "Google Drive API"
   - Create API Key
   - Copy the key

2. **Update Config**:
   - Open `html-version/js/gallery.js`
   - Line 15: Replace `YOUR_GOOGLE_API_KEY_HERE` with your key
   - Save file

3. **Make Folders Public**:
   - Open your Google Drive folders
   - Right-click → Share → "Anyone with link can view"

4. **Push Update**:
   ```bash
   git add .
   git commit -m "Add API key"
   git push
   ```

**Done!** Gallery now auto-updates from Drive.

---

## 📧 Enable Form Notifications

### Easiest Method: Formspree

1. Go to https://formspree.io/
2. Sign up (free)
3. Create form
4. Copy form ID
5. Update form in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

Now you'll get email when someone submits!

---

## 🔍 Common Issues & Fixes

### Website Shows 404
- Wait 5 minutes after enabling Pages
- Check repository is Public
- Verify branch is set to `main`

### Images Not Loading
- Check file names match exactly (case-sensitive)
- Ensure images are in `images` folder
- Try hard refresh (Ctrl + F5)

### Gallery Not Loading
- Gallery works without API key (shows demo)
- To fix: Add API key as shown above
- Check browser console (F12) for errors

### Form Not Working
- Form shows success locally
- For real emails: Use Formspree (see above)
- Or deploy backend (see DEPLOYMENT.md)

---

## 📱 Test Your Website

### Desktop
1. Open in Chrome: `https://your-site-url`
2. Test all navigation links
3. Submit test form
4. Check gallery loads

### Mobile
1. Open on phone browser
2. Check responsive design
3. Test menu works
4. Verify images load

---

## 🎯 Next Steps

### Immediately After Launch
- [ ] Share URL with team members
- [ ] Post on Instagram
- [ ] Add to WhatsApp channel description
- [ ] Update LinkedIn
- [ ] Send to college website admin

### Within First Week
- [ ] Add real team photos
- [ ] Upload event photos to Drive
- [ ] Test form submissions
- [ ] Get feedback from members
- [ ] Fix any issues

### Ongoing
- [ ] Add new events monthly
- [ ] Update gallery regularly
- [ ] Share achievements
- [ ] Keep content fresh

---

## 💡 Pro Tips

1. **Backup Your Code**:
   - Always keep copy on GitHub
   - Code is safe even if computer breaks

2. **Update Regularly**:
   - Add new events after each program
   - Update team when leadership changes
   - Keep gallery current

3. **Monitor Performance**:
   - Test on different devices
   - Check loading speed monthly
   - Fix broken links

4. **Engage Users**:
   - Share website on all platforms
   - Add new content regularly
   - Respond to form submissions quickly

---

## 📚 Full Documentation

For detailed guides, see:
- `README.md` - Complete documentation
- `DEPLOYMENT.md` - Detailed deployment guide
- `backend/README.md` - Backend setup

---

## 🆘 Need Help?

1. **Check Browser Console**: Press F12 → Console tab
2. **Read Error Messages**: Screenshot and google the error
3. **Contact Support**:
   - Email: aimlcluboct@gmail.com
   - Create GitHub Issue in repository

---

## ✅ Success Checklist

Before going live, verify:
- [ ] Website loads correctly
- [ ] All images display
- [ ] Navigation works smoothly
- [ ] Gallery shows images
- [ ] Form can be submitted
- [ ] Mobile responsive
- [ ] All links work
- [ ] No console errors
- [ ] Fast loading speed
- [ ] Looks professional

---

## 🎉 Congratulations!

You now have a professional website for your AI & ML Club!

**Share it with the world:**
- Website: `https://yourusername.github.io/website/`
- Show it to: Students, Faculty, Industry Partners

**Keep building amazing things!** 🚀

---

**Built with ❤️ by AI & ML Club OCT**  
*Innovate • Implement • Inspire*
