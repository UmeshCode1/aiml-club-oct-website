# AI & Machine Learning Club - OCT Bhopal

**Official Website**  
*Innovate • Implement • Inspire*

![Club Logo](html-version/images/logo.png)

## 🌟 Overview

A modern, responsive, and visually stunning website for the AI & Machine Learning Club at Oriental College of Technology, Bhopal. Built with cutting-edge web technologies and premium UI/UX design principles.

## ✨ Features

- **Premium Modern Design** - Glassmorphism, gradients, neon accents, and smooth animations
- **Fully Responsive** - Mobile-first design that works on all devices
- **Dynamic Gallery** - Auto-updating image gallery from Google Drive
- **Interactive Sections** - Home, About, Team, Events, Gallery, and Join Us
- **Smooth Animations** - AOS (Animate On Scroll) integration
- **Member Application** - Beautiful form for new member registration
- **Dark Theme** - Modern dark mode with neon cyan/green accents
- **Performance Optimized** - Lazy loading, caching, and optimized assets

## 🚀 Quick Start

### HTML/CSS/JS Version (Recommended for Quick Deploy)

1. Navigate to the `html-version` folder
2. Open `index.html` in a web browser
3. Or serve with a local server:
   ```bash
   cd html-version
   python -m http.server 8000
   ```
4. Visit `http://localhost:8000`

### React + Tailwind Version

1. Navigate to the `react-version` folder
2. Install dependencies:
   ```bash
   cd react-version
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
aiml-club-website/
├── html-version/           # Pure HTML/CSS/JS version
│   ├── index.html         # Main HTML file
│   ├── css/
│   │   └── styles.css     # Premium styles with glassmorphism
│   ├── js/
│   │   ├── app.js         # Main functionality
│   │   └── gallery.js     # Google Drive integration
│   └── images/
│       ├── logo.png       # Club logo
│       └── team-photo.jpg # Team group photo
│
├── react-version/          # React + Tailwind version
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main app component
│   └── package.json
│
├── backend/                # Node.js backend (optional)
│   ├── server.js          # Express server
│   └── package.json
│
└── README.md              # This file
```

## 🎨 Design Features

### Color Palette
- **Primary**: `#00f5ff` (Cyan)
- **Secondary**: `#00ff88` (Green)
- **Accent**: `#ff00ff` (Magenta)
- **Background**: `#0a0e27` (Dark Blue)

### Typography
- **Primary Font**: Inter
- **Display Font**: Space Grotesk

### Effects
- Glassmorphism cards
- Gradient backgrounds
- Neon glow effects
- Smooth hover transitions
- Parallax scrolling
- Animated counters

## 🔧 Configuration

### Google Drive Gallery Setup

To enable automatic image loading from Google Drive:

1. **Get Google Drive API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google Drive API
   - Create credentials (API Key)
   - Restrict the key to Google Drive API

2. **Configure the Gallery**
   - Open `html-version/js/gallery.js`
   - Replace `YOUR_GOOGLE_API_KEY_HERE` with your API key
   - Update folder IDs if needed:
     ```javascript
     const GALLERY_CONFIG = {
         mediaFolderId: '1-_byssQsFS1pw02iDxyt40_n2CdCBaOk',
         galleryFolderId: '1mGYEZ3sPGB8W2yPIXoh3WNEpTThfJ0Xn',
         apiKey: 'YOUR_ACTUAL_API_KEY',
     };
     ```

3. **Make Folders Public**
   - Open your Google Drive folders
   - Click "Share" → "Get link"
   - Set to "Anyone with the link can view"

**Note**: Without API key configuration, the website will use a demo gallery with placeholder images.

### Form Submission

Currently, the form shows a success message locally. To enable real form submission:

**Option 1: Google Forms Backend**
- Create a Google Form
- Use the form action URL in your HTML

**Option 2: Custom Backend** (see backend section)

**Option 3: Third-party Services**
- Formspree
- Netlify Forms
- EmailJS

## 🚢 Deployment

### GitHub Pages

1. **Prepare the site**:
   ```bash
   cd html-version
   ```

2. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/aimlcluboct/website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages
   - Select branch: `main`
   - Select folder: `/html-version` or root
   - Save and wait for deployment

4. **Custom Domain** (Optional):
   - Add a `CNAME` file with your domain
   - Configure DNS settings

### Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   cd html-version
   netlify deploy --prod
   ```

### Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd html-version
   vercel --prod
   ```

## 🖥️ Backend (Optional)

The backend folder contains an Express.js server for:
- Form submission handling
- Google Drive API proxy
- Email notifications

### Setup:

```bash
cd backend
npm install
npm start
```

See `backend/README.md` for detailed instructions.

## 👥 Team

### Faculty Leadership
- **Dr. Rajesh Kumar Nigam** - HOD, AIML Department
- **Shamaila Khan** - Coordinating Faculty

### Core Team
1. **Vishal Kumar** - President
2. **Umesh Patel** - Vice President
3. **Prakhar Sahu** - Media Relations
4. **Aarchi Sharma** - Event Head
5. **Parul Ajit** - Event Head
6. **Gourav Jain** - Event Head
7. **Prince Kumar** - Discipline Head
8. **Kinshuk Verma** - Tech Lead
9. **Khushi Kumari** - Media
10. **Arpit Mistrel** - Media
11. **Abhijeet Sarkar** - Editor
12. **Pritish Mandal** - Editor
13. **Heer** - Stage Lead
14. **Anshul Sharma** - Stage Lead

## 🔗 Links

- **GitHub**: [github.com/aimlcluboct](https://github.com/aimlcluboct)
- **Email**: aimlcluboct@gmail.com
- **WhatsApp**: [Join Channel](https://whatsapp.com/channel/0029VbAthv38V0tfulumuV1D)
- **Instagram**: [Follow Us](https://tr.ee/hJjcCHWnGT)
- **LinkedIn**: [Connect](https://www.linkedin.com/company/aimlcluboct)

## 📸 Media

- **Media Records**: [Google Drive](https://drive.google.com/drive/folders/1-_byssQsFS1pw02iDxyt40_n2CdCBaOk)
- **Gallery**: [Google Drive](https://drive.google.com/drive/folders/1mGYEZ3sPGB8W2yPIXoh3WNEpTThfJ0Xn)

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- JavaScript (ES6+)
- React.js (Alternative version)
- Tailwind CSS (Alternative version)

### Libraries
- AOS (Animate On Scroll)
- Font Awesome Icons
- Google Fonts (Inter, Space Grotesk)

### APIs
- Google Drive API v3

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## ⚡ Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Optimized images
- Lazy loading
- Code splitting (React version)

## 🎓 Development Guidelines

### Adding New Events

1. Open `index.html`
2. Find the Events section
3. Add a new timeline item:
```html
<div class="timeline-item" data-aos="fade-right">
    <div class="timeline-dot"></div>
    <div class="timeline-content glass-card">
        <div class="event-date">Month Year</div>
        <h3 class="event-title">Event Name</h3>
        <p class="event-description">Description</p>
        <div class="event-tags">
            <span class="tag">Tag1</span>
            <span class="tag">Tag2</span>
        </div>
        <a href="#gallery" class="event-link">
            View Photos <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</div>
```

### Adding Team Members

1. Open `index.html`
2. Find the Team section
3. Add a new team card in the appropriate category

### Customizing Colors

1. Open `css/styles.css`
2. Modify CSS variables in `:root`:
```css
:root {
    --primary-color: #00f5ff;
    --secondary-color: #00ff88;
    --accent-color: #ff00ff;
}
```

## 🐛 Troubleshooting

### Gallery Not Loading
- Check if Google Drive API key is configured
- Verify folders are publicly accessible
- Check browser console for errors
- Clear browser cache

### Images Not Displaying
- Verify image paths are correct
- Check if images exist in the `images` folder
- Ensure proper file permissions

### Form Not Submitting
- Configure form backend (see Form Submission section)
- Check browser console for JavaScript errors

## 📄 License

© 2025 AI & Machine Learning Club - Oriental College of Technology. All rights reserved.

## 🤝 Contributing

Want to contribute to the website? Contact us at aimlcluboct@gmail.com

## 📞 Support

For technical support or questions:
- Email: aimlcluboct@gmail.com
- GitHub Issues: [Create an issue](https://github.com/aimlcluboct/website/issues)

---

**Built with ❤️ by AI & ML Club OCT**  
*Innovate • Implement • Inspire*
