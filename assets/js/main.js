/**
 * ΠΑΟΡ Website - Main JavaScript
 * Κύρια λειτουργικότητα του website
 */

// ========================================
// 1. SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore empty or just # links
        if (href === '#' || !href) return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without scrolling
            history.pushState(null, null, href);
        }
    });
});

// ========================================
// 2. MOBILE MENU TOGGLE
// ========================================
function initMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;

    // Create hamburger button if it doesn't exist
    let hamburger = document.querySelector('.hamburger');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #FFD700;
            font-size: 2rem;
            cursor: pointer;
            padding: 10px;
        `;
        document.querySelector('nav .container').appendChild(hamburger);
    }

    // Toggle menu on mobile
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Show hamburger on mobile
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'block';
        nav.style.display = 'none';
    }

    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.style.display = 'none';
            nav.style.display = 'flex';
            nav.classList.remove('active');
        } else {
            hamburger.style.display = 'block';
            if (!nav.classList.contains('active')) {
                nav.style.display = 'none';
            }
        }
    });
}

// ========================================
// 3. SCROLL TO TOP BUTTON
// ========================================
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #FFD700;
        color: #000;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
    `;
    document.body.appendChild(scrollBtn);

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// 4. LAZY LOADING IMAGES
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// 5. FORM VALIDATION
// ========================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία', 'error');
            }
        });

        // Remove error styling on input
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });
}

// ========================================
// 6. NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// 7. ANIMATE ON SCROLL
// ========================================
function initAnimateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}

// ========================================
// 8. CONTACT FORM HANDLER
// ========================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate sending (replace with actual API call)
        showNotification('Το μήνυμα στάλθηκε επιτυχώς!', 'success');
        contactForm.reset();
        
        // Real implementation would be:
        // try {
        //     const response = await fetch('/api/contact', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });
        //     if (response.ok) {
        //         showNotification('Το μήνυμα στάλθηκε επιτυχώς!', 'success');
        //         contactForm.reset();
        //     }
        // } catch (error) {
        //     showNotification('Σφάλμα κατά την αποστολή', 'error');
        // }
    });
}

// ========================================
// 9. GALLERY LIGHTBOX
// ========================================
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length === 0) return;

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 9999;
        justify-content: center;
        align-items: center;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 40px;
        font-size: 3rem;
        color: #FFD700;
        background: none;
        border: none;
        cursor: pointer;
    `;
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Open lightbox
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// ========================================
// 10. ACTIVE NAVIGATION HIGHLIGHT
// ========================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// 11. COOKIE CONSENT (GDPR)
// ========================================
function initCookieConsent() {
    if (localStorage.getItem('cookieConsent')) return;

    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #1a1a1a;
        border-top: 3px solid #FFD700;
        padding: 20px;
        z-index: 9998;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
    `;
    
    banner.innerHTML = `
        <p style="color: #fff; margin: 0; flex: 1;">
            Χρησιμοποιούμε cookies για την καλύτερη εμπειρία χρήσης. 
            <a href="#privacy" style="color: #FFD700;">Περισσότερα</a>
        </p>
        <button id="acceptCookies" style="
            padding: 10px 30px;
            background: #FFD700;
            color: #000;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
        ">Αποδοχή</button>
    `;
    
    document.body.appendChild(banner);

    document.getElementById('acceptCookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        banner.remove();
    });
}

// ========================================
// 12. UTILITIES
// ========================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format date
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('el-GR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🖤💛 ΠΑΟΡ Website Loaded!');
    
    // Initialize all features
    initMobileMenu();
    initScrollToTop();
    initLazyLoading();
    initFormValidation();
    initAnimateOnScroll();
    initContactForm();
    initGalleryLightbox();
    initActiveNav();
    initCookieConsent();
});

// Export functions for external use
window.PAOR = {
    showNotification,
    formatDate,
    debounce
};