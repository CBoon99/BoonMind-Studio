// ===== GSAP SETUP =====
const hasGSAP = typeof window !== 'undefined' && window.gsap && window.ScrollTrigger;
const gsapInstance = hasGSAP ? window.gsap : null;

if (hasGSAP) {
    gsapInstance.registerPlugin(window.ScrollTrigger);
}

const MOTION_DURATION = 0.9;
const MOTION_EASE = 'power2.out';
const MOTION_STAGGER = 0.12;
const motionDefaults = { duration: MOTION_DURATION, ease: MOTION_EASE };

// ===== MOTION PREFERENCES =====
const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let shouldReduceMotion = motionMediaQuery.matches || window.innerWidth <= 768;
let gsapAnimationsInitialized = false;

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;
let cursorAnimationActive = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    if (!cursor || !cursorFollower) {
        cursorAnimationActive = false;
        return;
    }

    if (shouldReduceMotion) {
        cursorAnimationActive = false;
        return;
    }

    cursorX += (mouseX - cursorX) * 0.9;
    cursorY += (mouseY - cursorY) * 0.9;
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

const updateCursorState = () => {
    if (!cursor || !cursorFollower) return;
    if (shouldReduceMotion) {
        cursor.classList.add('cursor-hidden');
        cursorFollower.classList.add('cursor-hidden');
    } else {
        cursor.classList.remove('cursor-hidden');
        cursorFollower.classList.remove('cursor-hidden');
        if (!cursorAnimationActive) {
            cursorAnimationActive = true;
            requestAnimationFrame(animateCursor);
        }
    }
};

const updateMotionPreferences = () => {
    shouldReduceMotion = motionMediaQuery.matches || window.innerWidth <= 768;
    updateCursorState();
    if (!shouldReduceMotion && !gsapAnimationsInitialized) {
        initGsapAnimations();
        gsapAnimationsInitialized = true;
    }
};

if (typeof motionMediaQuery.addEventListener === 'function') {
    motionMediaQuery.addEventListener('change', updateMotionPreferences);
} else if (typeof motionMediaQuery.addListener === 'function') {
    motionMediaQuery.addListener(updateMotionPreferences);
}

window.addEventListener('resize', updateMotionPreferences);

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .faq-question, .stage-node');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '60px';
        cursorFollower.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
});

// ===== PROGRESS BAR =====
const progressBar = document.querySelector('.progress-bar');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(document.documentElement.scrollHeight - windowHeight, 1);
        const scrolled = window.scrollY / documentHeight;
        const progress = Math.min(Math.max(scrolled, 0), 1);
        progressBar.style.transform = `scaleX(${progress})`;
    });
}

// ===== NAVIGATION =====
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-links a');

const toggleMobileMenu = (isOpen) => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.toggle('active', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
};

menuToggle?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.contains('active');
    toggleMobileMenu(!isOpen);
});
mobileClose?.addEventListener('click', () => toggleMobileMenu(false));

mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
});

// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById('particles');
const ctx = canvas ? canvas.getContext('2d') : null;
let particlesPaused = false;

if (canvas && ctx) {
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());

    function animateParticles() {
        if (shouldReduceMotion) {
            if (!particlesPaused) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particlesPaused = true;
            }
            requestAnimationFrame(animateParticles);
            return;
        }

        particlesPaused = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        particles.forEach((particleA, indexA) => {
            particles.slice(indexA + 1).forEach(particleB => {
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particleA.x, particleA.y);
                    ctx.lineTo(particleB.x, particleB.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

function initGsapAnimations() {
    if (!hasGSAP) {
        return;
    }

    const animator = window.gsap;

    animator.from('.hero-title .line', {
        ...motionDefaults,
        y: 100,
        opacity: 0,
        stagger: MOTION_STAGGER
    });

    animator.from('.hero-badge', {
        ...motionDefaults,
        y: 30,
        opacity: 0,
        delay: 0.3
    });

    animator.from('.hero-subtitle', {
        ...motionDefaults,
        y: 30,
        opacity: 0,
        delay: 0.5
    });

    animator.from('.hero-cta', {
        ...motionDefaults,
        y: 30,
        opacity: 0,
        delay: 0.7
    });

    animator.from('.hero-scroll', {
        ...motionDefaults,
        opacity: 0,
        delay: 1
    });

    animator.utils.toArray('.section').forEach(section => {
        const header = section.querySelector('.section-header');
        if (!header) {
            return;
        }

        animator.from(header, {
            ...motionDefaults,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%'
            },
            y: 50,
            opacity: 0
        });
    });

    const animateCards = (selector, start = 'top 85%', offset = 60) => {
        animator.utils.toArray(selector).forEach((card, index) => {
            animator.from(card, {
                ...motionDefaults,
                scrollTrigger: {
                    trigger: card,
                    start
                },
                y: offset,
                opacity: 0,
                delay: index * MOTION_STAGGER
            });
        });
    };

    animateCards('.package-card', 'top 85%', 80);
    animateCards('.why-card', 'top 85%', 60);
    animateCards('.case-card', 'top 85%', 80);
    animateCards('.pricing-card', 'top 85%', 80);
    animateCards('.faq-item', 'top 90%', 40);

    animator.utils.toArray('.timeline-item').forEach((item, index) => {
        animator.from(item, {
            ...motionDefaults,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0
        });
    });

    animator.from('.architect-node', {
        ...motionDefaults,
        scrollTrigger: {
            trigger: '.workflow-panel',
            start: 'top 70%'
        },
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    animator.from('.stage-node:not(.architect-node)', {
        ...motionDefaults,
        scrollTrigger: {
            trigger: '.workflow-panel',
            start: 'top 70%'
        },
        scale: 0.9,
        opacity: 0,
        delay: 0.3,
        stagger: MOTION_STAGGER,
        ease: 'power3.out'
    });

    animator.utils.toArray('.stat-number').forEach(stat => {
        const target = stat.textContent;
        const isPlus = target.includes('+');

        animator.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%'
            },
            textContent: 0,
            duration: 2,
            ease: 'power1.inOut',
            snap: { textContent: 1 },
            onUpdate() {
                stat.textContent = Math.ceil(this.targets()[0].textContent) + (isPlus ? '+' : '');
            }
        });
    });

    animator.from('.document-preview', {
        ...motionDefaults,
        scrollTrigger: {
            trigger: '.consultation',
            start: 'top 70%'
        },
        x: 100,
        opacity: 0
    });

    animator.from('.doc-line', {
        ...motionDefaults,
        scrollTrigger: {
            trigger: '.consultation',
            start: 'top 70%'
        },
        scaleX: 0,
        stagger: 0.1,
        delay: 0.5,
        transformOrigin: 'left'
    });

    animator.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        opacity: 0.3,
        ease: 'none'
    });
}

// ===== FAQ TOGGLE =====
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const parentItem = question.closest('.faq-item');
        const isActive = parentItem?.classList.contains('active');
        
        faqItems.forEach(item => {
            item.classList.remove('active');
            const toggle = item.querySelector('.faq-question');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        if (!isActive && parentItem) {
            parentItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetSelector = this.getAttribute('href');
        if (!targetSelector || targetSelector === '#') {
            return;
        }

        const target = document.querySelector(targetSelector);
        if (!target) {
            return;
        }

        e.preventDefault();
        const behavior = shouldReduceMotion ? 'auto' : 'smooth';
        window.scrollTo({
            top: target.offsetTop - 100,
            behavior
        });
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    if (!hasGSAP) {
        document.body.style.overflow = '';
        return;
    }

    if (shouldReduceMotion) {
        document.body.style.overflow = '';
        return;
    }

    document.body.style.overflow = 'hidden';
    
    window.gsap.to('.hero', {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
            document.body.style.overflow = '';
        }
    });
});

updateMotionPreferences();

// ===== CONSOLE MESSAGE =====
console.log('%c Built by BoonMind Studio ', 'background: #38BDF8; color: #000; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Premium Brands & Websites — Delivered in Days ', 'color: #38BDF8; font-size: 14px;');

