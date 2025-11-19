# AI & ML Club Backend

Backend server for the AI & ML Club website that handles:
- Google Drive API proxy for gallery images
- Form submission handling
- Email notifications
- API rate limiting

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your credentials.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Run Production Server**:
   ```bash
   npm start
   ```

## 📋 API Endpoints

### Health Check
```
GET /
```
Returns server status.

### Gallery Images
```
GET /api/gallery
```
Fetches images from Google Drive folder.

**Response**:
```json
{
  "success": true,
  "count": 12,
  "images": [
    {
      "id": "file_id",
      "name": "image.jpg",
      "thumbnail": "url",
      "fullSize": "url",
      "createdTime": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### Submit Membership Application
```
POST /api/join
Content-Type: application/json
```

**Body**:
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "branch": "CSE",
  "year": "2",
  "skills": "Python, Machine Learning",
  "reason": "Passionate about AI"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Application submitted successfully!"
}
```

### Contact Form
```
POST /api/contact
Content-Type: application/json
```

**Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about club",
  "message": "I have a question..."
}
```

## 🔧 Configuration

### Google Drive API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Drive API
4. Create credentials (API Key)
5. Restrict the API key:
   - API restrictions: Google Drive API
   - Application restrictions: HTTP referrers (if needed)
6. Copy API key to `.env` file

### Email Setup (Gmail)

1. Enable 2-Step Verification in Google Account
2. Go to App Passwords
3. Generate password for "Mail"
4. Add to `.env` file:
   ```
   EMAIL_USER=aimlcluboct@gmail.com
   EMAIL_PASS=generated_app_password
   ```

## 🔒 Security Features

- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation
- Environment variable protection

## 📦 Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **googleapis**: Google Drive API client
- **nodemailer**: Email sending
- **helmet**: Security middleware
- **express-rate-limit**: Rate limiting

## 🚢 Deployment

### Heroku

```bash
heroku create aiml-club-backend
heroku config:set GOOGLE_API_KEY=your_key
heroku config:set EMAIL_USER=your_email
heroku config:set EMAIL_PASS=your_password
git push heroku main
```

### Vercel

```bash
vercel
```

Configure environment variables in Vercel dashboard.

### Railway

```bash
railway login
railway init
railway up
```

Add environment variables in Railway dashboard.

## 🧪 Testing

Test endpoints with curl:

```bash
# Health check
curl http://localhost:3001/

# Gallery
curl http://localhost:3001/api/gallery

# Submit form
curl -X POST http://localhost:3001/api/join \
  -H "Content-Type: application/json" \
  -d '{"fullname":"Test User","email":"test@test.com","branch":"CSE","year":"2","skills":"Python","reason":"Testing"}'
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 3001) |
| NODE_ENV | Environment | No (default: development) |
| GOOGLE_API_KEY | Google Drive API key | Yes |
| GOOGLE_DRIVE_FOLDER_ID | Gallery folder ID | Yes |
| EMAIL_USER | Email username | Yes |
| EMAIL_PASS | Email password | Yes |

## 🐛 Troubleshooting

### Gallery not loading
- Check GOOGLE_API_KEY is correct
- Verify folder ID matches
- Ensure folder is publicly accessible
- Check API quota limits

### Emails not sending
- Verify EMAIL_USER and EMAIL_PASS
- Use App Password for Gmail
- Check Gmail security settings

### CORS errors
- Add frontend domain to ALLOWED_ORIGINS
- Check CORS configuration in server.js

## 📞 Support

For issues or questions:
- Email: aimlcluboct@gmail.com
- GitHub: [github.com/aimlcluboct](https://github.com/aimlcluboct)

## 📄 License

© 2025 AI & ML Club - Oriental College of Technology
