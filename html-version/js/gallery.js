/**
 * AI & ML Club OCT - Google Drive Gallery Integration
 * Dynamic image loading from Google Drive folders
 */

// =====================================================
// Configuration
// =====================================================

const GALLERY_CONFIG = {
    // Google Drive folder IDs (extracted from URLs)
    mediaFolderId: '1-_byssQsFS1pw02iDxyt40_n2CdCBaOk',
    galleryFolderId: '1mGYEZ3sPGB8W2yPIXoh3WNEpTThfJ0Xn',
    mediaRecordsUrl: 'https://drive.google.com/drive/folders/1-_byssQsFS1pw02iDxyt40_n2CdCBaOk?usp=sharing',
    
    // API configuration (NEVER commit API key to public repos)
    apiKey: '', // Replace with your API key from environment variable
    
    // Cache settings
    cacheExpiry: 3600000, // 1 hour in milliseconds
    
    // Gallery settings
    maxImages: 50,
    imageQuality: 'high' // 'high', 'medium', 'low'
};

// =====================================================
// Google Drive API Integration
// =====================================================

class GoogleDriveGallery {
    constructor(config) {
        this.config = config;
        this.cache = this.loadCache();
        this.images = [];
    }
    
    /**
     * Initialize gallery and load images
     */
    async init() {
        const galleryGrid = document.getElementById('gallery-grid');
        
        try {
            // Try to load from cache first
            if (this.isCacheValid()) {
                console.log('Loading gallery from cache...');
                this.images = this.cache.images;
                this.renderGallery();
                
                // Fetch fresh data in background
                this.refreshGallery();
            } else {
                console.log('Fetching fresh gallery data...');
                await this.fetchImages();
                this.renderGallery();
            }
        } catch (error) {
            console.error('Error loading gallery:', error);
            this.showError();
            
            // Fallback to demo images
            this.loadDemoGallery();
        }
    }
    
    /**
     * Fetch images from Google Drive
     */
    async fetchImages() {
        const apiKey = this.config.apiKey;
        const folderId = this.config.galleryFolderId;
        
        // Check if API key is configured
        if (!apiKey || apiKey === 'YOUR_GOOGLE_API_KEY_HERE' || apiKey === '') {
            console.warn('Google Drive API key not configured. Using demo gallery.');
            this.loadDemoGallery();
            return;
        }
        
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&key=${apiKey}&fields=files(id,name,thumbnailLink,webContentLink,createdTime)&orderBy=createdTime desc`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                cache: 'default'
            });
            
            if (!response.ok) {
                console.error(`Google Drive API error: ${response.status}`);
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            this.images = data.files.map((file, index) => ({
                id: file.id,
                name: file.name,
                thumbnail: this.getThumbnailUrl(file),
                fullSize: this.getFullSizeUrl(file),
                category: this.categorizeImage(file.name),
                createdTime: file.createdTime,
                index: index
            }));
            
            // Save to cache
            this.saveCache();
            
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
    
    /**
     * Refresh gallery in background
     */
    async refreshGallery() {
        try {
            await this.fetchImages();
            // Silently update the gallery
            this.renderGallery(true);
        } catch (error) {
            console.log('Background refresh failed, using cached data');
        }
    }
    
    /**
     * Get thumbnail URL from file
     */
    getThumbnailUrl(file) {
        // Use Google Drive thumbnail or construct image URL
        if (file.thumbnailLink) {
            return file.thumbnailLink.replace('=s220', '=s800'); // Higher quality
        }
        return `https://drive.google.com/thumbnail?id=${file.id}&sz=w800`;
    }
    
    /**
     * Get full-size image URL
     */
    getFullSizeUrl(file) {
        return `https://drive.google.com/uc?export=view&id=${file.id}`;
    }
    
    /**
     * Categorize image based on filename
     */
    categorizeImage(filename) {
        const lower = filename.toLowerCase();
        
        if (lower.includes('event') || lower.includes('hackathon') || lower.includes('competition')) {
            return 'events';
        } else if (lower.includes('workshop') || lower.includes('seminar') || lower.includes('bootcamp')) {
            return 'workshops';
        } else if (lower.includes('team') || lower.includes('group') || lower.includes('member')) {
            return 'team';
        }
        
        return 'events'; // Default category
    }
    
    /**
     * Render gallery to DOM
     */
    renderGallery(silent = false) {
        const galleryGrid = document.getElementById('gallery-grid');
        
        if (!silent) {
            galleryGrid.innerHTML = '';
        }
        
        if (this.images.length === 0) {
            this.loadDemoGallery();
            return;
        }
        
        // Limit images
        const imagesToShow = this.images.slice(0, this.config.maxImages);
        
        // Create gallery items
        const fragment = document.createDocumentFragment();
        
        imagesToShow.forEach((image, index) => {
            const item = this.createGalleryItem(image, index);
            fragment.appendChild(item);
        });
        
        if (!silent) {
            galleryGrid.appendChild(fragment);
            
            // Update global images for lightbox
            window.galleryImages = imagesToShow.map(img => ({
                src: img.fullSize,
                caption: img.name.replace(/\.[^/.]+$/, '') // Remove extension
            }));
            
            // Animate items
            this.animateGalleryItems();
        }
    }
    
    /**
     * Create gallery item element
     */
    createGalleryItem(image, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', image.category);
        div.setAttribute('data-aos', 'zoom-in');
        div.setAttribute('data-aos-delay', Math.min(index * 50, 500));
        
        div.innerHTML = `
            <img src="${image.thumbnail}" alt="${image.name}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${this.formatImageName(image.name)}</h4>
                <p>${this.formatDate(image.createdTime)}</p>
            </div>
        `;
        
        div.addEventListener('click', () => {
            window.openLightbox(index);
        });
        
        return div;
    }
    
    /**
     * Format image name for display
     */
    formatImageName(filename) {
        return filename
            .replace(/\.[^/.]+$/, '') // Remove extension
            .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
            .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words
    }
    
    /**
     * Format date for display
     */
    formatDate(dateString) {
        if (!dateString) return 'Recently added';
        
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    /**
     * Animate gallery items
     */
    animateGalleryItems() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
    
    /**
     * Load demo gallery (fallback)
     */
    loadDemoGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        const demoImages = this.generateDemoImages();
        
        galleryGrid.innerHTML = '';
        
        const fragment = document.createDocumentFragment();
        
        demoImages.forEach((image, index) => {
            const item = this.createDemoGalleryItem(image, index);
            fragment.appendChild(item);
        });
        
        galleryGrid.appendChild(fragment);
        
        // Update global images for lightbox
        window.galleryImages = demoImages.map(img => ({
            src: img.src,
            caption: img.caption
        }));
        
        this.animateGalleryItems();
    }
    
    /**
     * Generate demo images
     */
    generateDemoImages() {
        const categories = ['events', 'workshops', 'team'];
        const titles = [
            'AI Hackathon 2025',
            'Deep Learning Workshop',
            'ML Bootcamp Session',
            'Team Building Event',
            'Industry Expert Talk',
            'Project Showcase',
            'Club Inauguration',
            'Coding Competition',
            'Research Presentation',
            'Networking Session',
            'Tech Talk Series',
            'Innovation Summit'
        ];
        
        return titles.map((title, index) => ({
            src: `https://picsum.photos/seed/${index + 100}/800/600`,
            caption: title,
            category: categories[index % categories.length],
            index: index
        }));
    }
    
    /**
     * Create demo gallery item
     */
    createDemoGalleryItem(image, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', image.category);
        div.setAttribute('data-aos', 'zoom-in');
        div.setAttribute('data-aos-delay', Math.min(index * 50, 500));
        
        div.innerHTML = `
            <img src="${image.src}" alt="${image.caption}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${image.caption}</h4>
                <p>AI & ML Club Event</p>
            </div>
        `;
        
        div.addEventListener('click', () => {
            window.openLightbox(index);
        });
        
        return div;
    }
    
    /**
     * Show error message
     */
    showError() {
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = `
            <div class="gallery-loading">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #ff6b6b; margin-bottom: 1rem;"></i>
                <p style="color: #ff6b6b;">Unable to load gallery from Google Drive.</p>
                <p style="color: #94a3b8; margin-top: 0.5rem;">Loading demo gallery instead...</p>
            </div>
        `;
    }
    
    /**
     * Cache management
     */
    loadCache() {
        try {
            const cached = localStorage.getItem('aiml_gallery_cache');
            return cached ? JSON.parse(cached) : { images: [], timestamp: 0 };
        } catch (error) {
            return { images: [], timestamp: 0 };
        }
    }
    
    saveCache() {
        try {
            const cacheData = {
                images: this.images,
                timestamp: Date.now()
            };
            localStorage.setItem('aiml_gallery_cache', JSON.stringify(cacheData));
        } catch (error) {
            console.warn('Failed to save cache:', error);
        }
    }
    
    isCacheValid() {
        const age = Date.now() - this.cache.timestamp;
        return age < this.config.cacheExpiry && this.cache.images.length > 0;
    }
    
    clearCache() {
        localStorage.removeItem('aiml_gallery_cache');
        this.cache = { images: [], timestamp: 0 };
    }
}

// =====================================================
// Initialize Gallery
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    const gallery = new GoogleDriveGallery(GALLERY_CONFIG);
    gallery.init();
    
    // Expose gallery instance globally
    window.galleryInstance = gallery;
    
    // Auto-refresh every hour
    setInterval(() => {
        gallery.refreshGallery();
    }, GALLERY_CONFIG.cacheExpiry);
});

// =====================================================
// Public API
// =====================================================

window.aimlGallery = {
    refresh: () => window.galleryInstance?.refreshGallery(),
    clearCache: () => window.galleryInstance?.clearCache(),
    reload: () => {
        window.galleryInstance?.clearCache();
        window.galleryInstance?.init();
    }
};

// =====================================================
// Setup Instructions (Console)
// =====================================================

console.log('%c📸 Gallery Setup Instructions', 'font-size: 16px; font-weight: bold; color: #00f5ff;');
console.log('%cTo enable Google Drive integration:', 'color: #94a3b8;');
console.log('%c1. Get a Google Drive API key from Google Cloud Console', 'color: #94a3b8;');
console.log('%c2. Enable Google Drive API for your project', 'color: #94a3b8;');
console.log('%c3. Replace "YOUR_GOOGLE_API_KEY_HERE" in gallery.js with your API key', 'color: #94a3b8;');
console.log('%c4. Make sure your Google Drive folders are shared publicly', 'color: #94a3b8;');
console.log('%c\nCurrent status: Using demo gallery', 'color: #fbbf24;');
