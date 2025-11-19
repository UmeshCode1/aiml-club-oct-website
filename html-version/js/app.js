/**
 * AI & ML Club OCT - Main JavaScript
 * Modern, interactive functionality
 */

// =====================================================
// Initialization
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavigation();
    initAOS();
    initCounters();
    initFormHandling();
    initSmoothScroll();
});

// =====================================================
// Preloader
// =====================================================

function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// =====================================================
// Navigation
// =====================================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// =====================================================
// AOS (Animate On Scroll)
// =====================================================

function initAOS() {
    // Initialize AOS library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 100
        });
    }
}

// =====================================================
// Counter Animation
// =====================================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    let hasAnimated = false;
    
    const animateCounters = () => {
        if (hasAnimated) return;
        
        const counterSection = document.querySelector('.hero-stats');
        const rect = counterSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            hasAnimated = true;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const increment = target / speed;
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load
}

// =====================================================
// Smooth Scroll
// =====================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// Form Handling
// =====================================================

function initFormHandling() {
    const form = document.getElementById('join-form');
    const messageDiv = form.querySelector('.form-message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Sanitize input to prevent XSS
        const sanitize = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };
        
        // Get form data with sanitization
        const formData = {
            fullname: sanitize(form.fullname.value.trim()),
            email: sanitize(form.email.value.trim()),
            branch: sanitize(form.branch.value),
            year: sanitize(form.year.value),
            skills: sanitize(form.skills.value.trim()),
            reason: sanitize(form.reason.value.trim())
        };
        
        // Basic validation
        if (!validateForm(formData)) {
            showMessage('Please fill all fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting...</span><i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            showMessage('Application submitted successfully! We\'ll contact you soon.', 'success');
            form.reset();
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Replace with actual backend API call with proper error handling
            // Example: 
            // const response = await fetch('/api/join', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
            // if (!response.ok) throw new Error('Submission failed');
            
        }, 2000);
    });
    
    function validateForm(data) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }
        
        // Check all required fields
        return Object.values(data).every(value => value !== '');
    }
    
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.className = 'form-message';
        }, 5000);
    }
}

// =====================================================
// Gallery Filters
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery items
            const filter = btn.getAttribute('data-filter');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// =====================================================
// Lightbox
// =====================================================

let currentImageIndex = 0;
let galleryImages = [];

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    // Open lightbox
    window.openLightbox = (index) => {
        currentImageIndex = index;
        showLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigate images
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showLightboxImage();
    });
    
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showLightboxImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
    
    function showLightboxImage() {
        const image = galleryImages[currentImageIndex];
        if (image) {
            lightboxImg.src = image.src;
            lightboxCaption.textContent = image.caption || '';
        }
    }
}

// =====================================================
// Parallax Effect
// =====================================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// =====================================================
// Fade-in Animation for Sections
// =====================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// =====================================================
// Easter Egg - Konami Code
// =====================================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Fun animation or special effect
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
    
    console.log('🎉 You found the easter egg! Keep exploring AI & ML!');
}

// =====================================================
// Performance Optimization - Lazy Loading
// =====================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =====================================================
// Initialize Lightbox on Load
// =====================================================

document.addEventListener('DOMContentLoaded', initLightbox);

// =====================================================
// Console Message
// =====================================================

console.log('%c🤖 AI & ML Club OCT', 'font-size: 24px; font-weight: bold; color: #00f5ff;');
console.log('%cInnovate • Implement • Inspire', 'font-size: 14px; color: #00ff88;');
console.log('%cInterested in joining? Visit aimlcluboct@gmail.com', 'font-size: 12px; color: #94a3b8;');

// =====================================================
// Export Functions for Global Use
// =====================================================

window.aimlClub = {
    openLightbox,
    version: '1.0.0',
    contact: 'aimlcluboct@gmail.com'
};
