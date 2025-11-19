/**
 * AI & ML Club OCT - Backend Server
 * Handles Google Drive API proxy and form submissions
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// =====================================================
// Middleware
// =====================================================

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// =====================================================
// Configuration
// =====================================================

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1mGYEZ3sPGB8W2yPIXoh3WNEpTThfJ0Xn';

// Email configuration
const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// =====================================================
// Routes
// =====================================================

// Health check
app.get('/', (req, res) => {
    res.json({
        message: 'AI & ML Club OCT Backend API',
        version: '1.0.0',
        status: 'running'
    });
});

// Get gallery images from Google Drive
app.get('/api/gallery', async (req, res) => {
    try {
        const drive = google.drive({
            version: 'v3',
            auth: GOOGLE_API_KEY
        });

        const response = await drive.files.list({
            q: `'${GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/'`,
            fields: 'files(id, name, thumbnailLink, webContentLink, createdTime, imageMediaMetadata)',
            orderBy: 'createdTime desc',
            pageSize: 50
        });

        const images = response.data.files.map(file => ({
            id: file.id,
            name: file.name,
            thumbnail: file.thumbnailLink?.replace('=s220', '=s800') || `https://drive.google.com/thumbnail?id=${file.id}&sz=w800`,
            fullSize: `https://drive.google.com/uc?export=view&id=${file.id}`,
            createdTime: file.createdTime,
            metadata: file.imageMediaMetadata
        }));

        res.json({
            success: true,
            count: images.length,
            images: images
        });

    } catch (error) {
        console.error('Gallery API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch gallery images',
            message: error.message
        });
    }
});

// Submit membership form
app.post('/api/join', async (req, res) => {
    try {
        const { fullname, email, branch, year, skills, reason } = req.body;

        // Validation
        if (!fullname || !email || !branch || !year || !skills || !reason) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email address'
            });
        }

        // Send notification email to club
        const clubMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'aimlcluboct@gmail.com',
            subject: 'New Membership Application - AI & ML Club',
            html: `
                <h2>New Membership Application</h2>
                <table style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${fullname}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Branch:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${branch}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Year:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${year}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Skills:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${skills}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Reason:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${reason}</td>
                    </tr>
                </table>
                <p style="margin-top: 20px; color: #666;">Submitted on: ${new Date().toLocaleString()}</p>
            `
        };

        // Send confirmation email to applicant
        const applicantMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Application Received - AI & ML Club OCT',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #00f5ff;">Thank you for applying!</h2>
                    <p>Dear ${fullname},</p>
                    <p>We have received your application to join the AI & ML Club at Oriental College of Technology.</p>
                    <p>Our team will review your application and get back to you soon.</p>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Your Application Details:</h3>
                        <p><strong>Name:</strong> ${fullname}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Branch:</strong> ${branch}</p>
                        <p><strong>Year:</strong> ${year}</p>
                        <p><strong>Skills:</strong> ${skills}</p>
                    </div>
                    <p>If you have any questions, feel free to reach out to us at aimlcluboct@gmail.com</p>
                    <p style="margin-top: 30px;">Best regards,<br><strong>AI & ML Club Team</strong><br>Oriental College of Technology</p>
                    <p style="color: #00f5ff; font-style: italic;">Innovate • Implement • Inspire</p>
                </div>
            `
        };

        // Send emails
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await emailTransporter.sendMail(clubMailOptions);
            await emailTransporter.sendMail(applicantMailOptions);
        }

        // Log application (you can also save to database here)
        console.log('New membership application:', {
            fullname,
            email,
            branch,
            year,
            timestamp: new Date().toISOString()
        });

        res.json({
            success: true,
            message: 'Application submitted successfully! Check your email for confirmation.'
        });

    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit application',
            message: error.message
        });
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'aimlcluboct@gmail.com',
            subject: `Contact Form: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <p style="color: #666;">Submitted on: ${new Date().toLocaleString()}</p>
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await emailTransporter.sendMail(mailOptions);
        }

        res.json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message'
        });
    }
});

// =====================================================
// Error Handling
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// =====================================================
// Start Server
// =====================================================

app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════╗
    ║  AI & ML Club OCT - Backend Server      ║
    ║  Server running on port ${PORT}            ║
    ║  Environment: ${process.env.NODE_ENV || 'development'}              ║
    ╚══════════════════════════════════════════╝
    `);
    
    if (!GOOGLE_API_KEY) {
        console.warn('⚠️  Warning: GOOGLE_API_KEY not configured');
    }
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('⚠️  Warning: Email credentials not configured');
    }
});

module.exports = app;
