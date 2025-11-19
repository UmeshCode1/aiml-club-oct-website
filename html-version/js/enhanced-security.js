/**
 * Enhanced Security Functions & UI Improvements
 * AI & ML Club OCT
 */

// =====================================================
// Security Functions
// =====================================================

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - Raw user input
 * @returns {string} - Sanitized output
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML
        .replace(/[<>]/g, '')
        .trim();
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Validate required fields
 * @param {string} value - Field value
 * @param {number} minLength - Minimum length required
 * @returns {boolean} - True if valid
 */
function validateRequired(value, minLength = 1) {
    return value && value.trim().length >= minLength;
}

/**
 * Secure external link opening
 * @param {string} url - URL to open
 */
function openSecureLink(url) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
}

/**
 * Rate limiting for form submissions
 */
const RateLimiter = {
    attempts: {},
    maxAttempts: 3,
    windowMs: 15 * 60 * 1000, // 15 minutes
    
    canAttempt(key) {
        const now = Date.now();
        if (!this.attempts[key]) {
            this.attempts[key] = [];
        }
        
        // Remove old attempts
        this.attempts[key] = this.attempts[key].filter(
            timestamp => now - timestamp < this.windowMs
        );
        
        return this.attempts[key].length < this.maxAttempts;
    },
    
    recordAttempt(key) {
        if (!this.attempts[key]) {
            this.attempts[key] = [];
        }
        this.attempts[key].push(Date.now());
    }
};

// =====================================================
// Enhanced Form Validation with Visual Feedback
// =====================================================

function initEnhancedFormValidation() {
    const form = document.getElementById('join-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('input', () => {
            validateField(input);
        });
        
        // Blur validation
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        // Enhanced focus effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Validate individual form field with visual feedback
 * @param {HTMLElement} field - Input field to validate
 */
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error
    removeFieldError(field);
    
    if (required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (value) {
        switch (type) {
            case 'email':
                if (!validateEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'tel':
                if (!validatePhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid 10-digit phone number';
                }
                break;
            default:
                if (field.hasAttribute('minlength')) {
                    const minLength = parseInt(field.getAttribute('minlength'));
                    if (value.length < minLength) {
                        isValid = false;
                        errorMessage = `Minimum ${minLength} characters required`;
                    }
                }
        }
    }
    
    // Update field state
    if (value && isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        addFieldSuccess(field);
    } else if (!isValid) {
        field.classList.remove('valid');
        field.classList.add('invalid');
        addFieldError(field, errorMessage);
    } else {
        field.classList.remove('valid', 'invalid');
    }
    
    return isValid;
}

/**
 * Add error message to field
 */
function addFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorDiv.style.cssText = `
        color: #ff4757;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideDown 0.3s ease;
    `;
    
    formGroup.appendChild(errorDiv);
}

/**
 * Add success indicator to field
 */
function addFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    const successIcon = document.createElement('i');
    successIcon.className = 'fas fa-check-circle field-success';
    successIcon.style.cssText = `
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--secondary-color);
        font-size: 1.25rem;
        animation: scaleIn 0.3s ease;
    `;
    
    formGroup.style.position = 'relative';
    formGroup.appendChild(successIcon);
}

/**
 * Remove field error
 */
function removeFieldError(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    const error = formGroup.querySelector('.field-error');
    const success = formGroup.querySelector('.field-success');
    
    if (error) error.remove();
    if (success) success.remove();
}

// =====================================================
// Enhanced Form Submission with Security
// =====================================================

function initSecureFormSubmission() {
    const form = document.getElementById('join-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Rate limiting check
        const userIdentifier = 'form-submission';
        if (!RateLimiter.canAttempt(userIdentifier)) {
            showNotification('Too many attempts. Please try again later.', 'error');
            return;
        }
        
        // Validate all fields
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Please fix all errors before submitting', 'error');
            return;
        }
        
        // Collect and sanitize form data
        const formData = new FormData(form);
        const sanitizedData = {};
        
        for (let [key, value] of formData.entries()) {
            sanitizedData[key] = sanitizeInput(value);
        }
        
        // Record attempt
        RateLimiter.recordAttempt(userIdentifier);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            showNotification('Application submitted successfully! We\'ll contact you soon.', 'success');
            form.reset();
            
            // Reset field states
            inputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
                removeFieldError(input);
            });
            
            // Track event (analytics)
            trackEvent('form_submission', 'join_club', 'success');
            
        } catch (error) {
            console.error('Submission error:', error);
            showNotification('An error occurred. Please try again.', 'error');
            trackEvent('form_submission', 'join_club', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// =====================================================
// Enhanced Notification System
// =====================================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${sanitizeInput(message)}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.5rem 2rem;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 2px solid var(--glass-border);
        border-radius: 16px;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        box-shadow: var(--shadow-lg);
        max-width: 400px;
    `;
    
    // Type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'var(--secondary-color)';
        notification.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.3)';
    } else if (type === 'error') {
        notification.style.borderColor = '#ff4757';
        notification.style.boxShadow = '0 0 30px rgba(255, 71, 87, 0.3)';
    }
    
    document.body.appendChild(notification);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// =====================================================
// Enhanced Smooth Scroll with Progress Indicator
// =====================================================

function initEnhancedSmoothScroll() {
    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(0, 245, 255, 0.6);
    `;
    document.body.appendChild(progressBar);
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// =====================================================
// Enhanced Interactive Elements
// =====================================================

function initInteractiveElements() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn, .btn-primary, button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add tilt effect to cards
    document.querySelectorAll('.glass-card, .team-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// =====================================================
// Enhanced Lazy Loading with Intersection Observer
// =====================================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// =====================================================
// Analytics Tracking (Privacy-Friendly)
// =====================================================

function trackEvent(category, action, label) {
    // Only track if user hasn't opted out
    if (localStorage.getItem('analytics_opt_out') === 'true') return;
    
    console.log('Event tracked:', { category, action, label });
    
    // Send to analytics service (replace with actual implementation)
    // Example: gtag('event', action, { event_category: category, event_label: label });
}

// =====================================================
// Add Animations
// =====================================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes scaleIn {
        from { opacity: 0; transform: translateY(-50%) scale(0); }
        to { opacity: 1; transform: translateY(-50%) scale(1); }
    }
    
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
    
    @keyframes rippleEffect {
        to { transform: scale(4); opacity: 0; }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.5rem;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// =====================================================
// Initialize All Enhanced Features
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initEnhancedFormValidation();
    initSecureFormSubmission();
    initEnhancedSmoothScroll();
    initInteractiveElements();
    initLazyLoading();
    
    console.log('✅ Enhanced UI & Security features initialized');
});

// Export functions for use in other scripts
window.AIMLClubSecurity = {
    sanitizeInput,
    validateEmail,
    validatePhone,
    validateRequired,
    openSecureLink,
    showNotification,
    trackEvent
};
