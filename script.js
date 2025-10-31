// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (currentTheme === 'dark') {
    if (themeToggle) themeToggle.checked = true;
    body.classList.add('dark-theme');
} else {
    if (themeToggle) themeToggle.checked = false;
    body.classList.add('light-theme');
}

// Toggle theme function
function toggleTheme() {
    if (themeToggle.checked) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Add event listener to theme toggle
if (themeToggle) {
    themeToggle.addEventListener('change', toggleTheme);
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - 150)) {
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

// Loading Screen removed for instant loading

// ===================================
// CURSOR HOVER JUMP ANIMATIONS
// ===================================

// Add jump animation to interactive elements on hover
const jumpElements = document.querySelectorAll('.project-card, .skill-category, .contact-item, .education-item, .btn, .social-link, .skill-tag, .tech-tag');

jumpElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        // Add jump-settle animation
        this.style.animation = 'jumpSettle 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });

    element.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Jump and settle keyframe animation (will be added to CSS via style injection)
const jumpAnimation = `
@keyframes jumpSettle {
    0% {
        transform: translateY(-50px) scale(0.9);
        opacity: 0.5;
    }
    50% {
        transform: translateY(-10px) scale(1.05);
        opacity: 1;
    }
    75% {
        transform: translateY(5px) scale(0.98);
    }
    100% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

@keyframes magneticPull {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1.05);
    }
}
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = jumpAnimation;
document.head.appendChild(styleSheet);

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealElements = document.querySelectorAll('.project-card, .skill-category, .education-item, .contact-item, .about-text');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'revealFromTop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(element => {
    element.style.opacity = '0';
    revealObserver.observe(element);
});

// Reveal animation
const revealAnimation = `
@keyframes revealFromTop {
    0% {
        transform: translateY(-30px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
`;

const revealStyle = document.createElement('style');
revealStyle.textContent = revealAnimation;
document.head.appendChild(revealStyle);

// ===================================
// CUSTOM CURSOR WITH FOLLOWER
// ===================================

// Create custom cursor elements
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';

document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

// Cursor styles
const cursorStyles = `
.custom-cursor {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--primary-color);
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    mix-blend-mode: difference;
}

.cursor-follower {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--primary-color);
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.3s ease;
    opacity: 0.5;
}

.cursor-hover {
    transform: scale(2);
}

.cursor-follower-hover {
    transform: scale(1.5);
    opacity: 0.8;
    border-color: var(--accent-color);
}
`;

const cursorStyleSheet = document.createElement('style');
cursorStyleSheet.textContent = cursorStyles;
document.head.appendChild(cursorStyleSheet);

// Track cursor position
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;

    followerX += distX * 0.1;
    followerY += distY * 0.1;

    cursorFollower.style.left = (followerX - 20) + 'px';
    cursorFollower.style.top = (followerY - 20) + 'px';

    requestAnimationFrame(animateFollower);
}

animateFollower();

// Add hover effects to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .contact-item, .social-link');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-follower-hover');
    });

    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-follower-hover');
    });
});

// ===================================
// TYPING ANIMATION FOR HERO
// ===================================

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--primary-color)';

    let charIndex = 0;

    function typeText() {
        if (charIndex < text.length) {
            heroSubtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(() => {
                heroSubtitle.style.borderRight = 'none';
            }, 500);
        }
    }

    setTimeout(typeText, 500);
}

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

const progressStyles = `
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
    z-index: 10000;
    transform-origin: left;
    animation: progressPulse 2s ease-in-out infinite;
}

@keyframes progressPulse {
    0%, 100% {
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }
    50% {
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
    }
}
`;

const progressStyleSheet = document.createElement('style');
progressStyleSheet.textContent = progressStyles;
document.head.appendChild(progressStyleSheet);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = scrollPercentage + '%';
});

// ===================================
// MAGNETIC BUTTON EFFECT
// ===================================

const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ===================================
// PARALLAX SCROLL EFFECT
// ===================================

const parallaxElements = document.querySelectorAll('.hero-image, .skill-icon, .project-header i, .contact-icon');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===================================
// ENHANCED SKILL TAG ANIMATIONS
// ===================================

const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.animation = 'bounceIn 0.5s ease';
    });

    tag.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

const scrollTopStyles = `
.scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-1);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 9999;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
    animation: bounce 2s infinite;
}

.scroll-to-top:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.6);
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}
`;

const scrollTopStyleSheet = document.createElement('style');
scrollTopStyleSheet.textContent = scrollTopStyles;
document.head.appendChild(scrollTopStyleSheet);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// PARTICLE EFFECTS ON CURSOR
// ===================================

let particlesEnabled = true;
let lastParticleTime = 0;

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();

    if (particlesEnabled && currentTime - lastParticleTime > 50) {
        createParticle(e.clientX, e.clientY);
        lastParticleTime = currentTime;
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

const particleStyles = `
.cursor-particle {
    position: fixed;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--primary-color);
    pointer-events: none;
    z-index: 9997;
    opacity: 0.6;
    animation: particleFade 1s ease-out forwards;
}

@keyframes particleFade {
    0% {
        transform: scale(1) translateY(0);
        opacity: 0.6;
    }
    100% {
        transform: scale(0) translateY(-20px);
        opacity: 0;
    }
}
`;

const particleStyleSheet = document.createElement('style');
particleStyleSheet.textContent = particleStyles;
document.head.appendChild(particleStyleSheet);

// ===================================
// SECTION TRANSITION EFFECTS
// ===================================

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'sectionFadeIn 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

const sectionStyles = `
@keyframes sectionFadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

const sectionStyleSheet = document.createElement('style');
sectionStyleSheet.textContent = sectionStyles;
document.head.appendChild(sectionStyleSheet);

// ===================================
// ENHANCED CARD TILT EFFECT
// ===================================

const tiltCards = document.querySelectorAll('.project-card, .skill-category');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================

console.log('%c👋 Welcome to SriKumaran VM\'s Portfolio!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cBuilt with modern web technologies and love ❤️', 'font-size: 14px; color: #8b5cf6;');
console.log('%c🚀 Featuring: Custom animations, scroll effects, and interactive elements', 'font-size: 12px; color: #ec4899;');