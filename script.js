// Typing Animation for Terminal
const typedTextElement = document.getElementById('typed-text');
const outputElement = document.getElementById('output');
const commands = [
    'whoami',
    'initiating_connection...',
    'decrypting_identity...',
    'access_granted'
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeCommand() {
    const currentCommand = commands[commandIndex];

    if (!isDeleting) {
        typedTextElement.textContent = currentCommand.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentCommand.length) {
            // Show output after command is typed
            if (commandIndex === 0) {
                outputElement.textContent = '> unknown@darknet';
            } else if (commandIndex === 1) {
                outputElement.textContent = '> [████████████████████] 100%';
            } else if (commandIndex === 2) {
                outputElement.textContent = '> Identity: CLASSIFIED';
            } else if (commandIndex === 3) {
                outputElement.textContent = '> Welcome, Unknown. The network is yours.';
            }

            isDeleting = true;
            setTimeout(typeCommand, 2000);
            return;
        }
    } else {
        typedTextElement.textContent = currentCommand.substring(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            charIndex = 0;
            setTimeout(typeCommand, 500);
            return;
        }
    }

    const typingSpeed = isDeleting ? 30 : 100;
    setTimeout(typeCommand, typingSpeed);
}

// Start typing animation
setTimeout(typeCommand, 1000);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Stats Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (stat.textContent === '0') {
                    animateCounter(stat);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Skill Bar Animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.animation = 'fillBar 2s ease-out forwards';
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-grid');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Matrix Background Effect
function createMatrixEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.1';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';

    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Initialize matrix effect
createMatrixEffect();

// Window resize handler for matrix effect
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const existingCanvas = document.querySelector('.hero canvas');
        if (existingCanvas) {
            existingCanvas.remove();
            createMatrixEffect();
        }
    }, 250);
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Create terminal output
        const terminalBody = this.closest('.terminal-body');
        const output = document.createElement('div');
        output.style.marginTop = '1rem';
        output.style.padding = '1rem';
        output.style.background = 'rgba(0, 255, 65, 0.1)';
        output.style.border = '1px solid var(--primary-color)';
        output.style.borderRadius = '4px';
        output.innerHTML = `
            <p style="color: var(--primary-color);">> Encrypting message...</p>
            <p style="color: var(--secondary-color);">> Message encrypted with RSA-4096</p>
            <p style="color: var(--primary-color);">> Sending through secure channel...</p>
            <p style="color: var(--secondary-color);">> Message delivered successfully!</p>
            <p style="color: #888; margin-top: 0.5rem;">Your message has been encrypted and sent. You will be contacted through secure channels.</p>
        `;

        terminalBody.appendChild(output);

        // Reset form
        contactForm.reset();

        // Remove output after 5 seconds
        setTimeout(() => {
            output.style.transition = 'opacity 0.5s';
            output.style.opacity = '0';
            setTimeout(() => output.remove(), 500);
        }, 5000);
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 65, 0.1)';
    }

    lastScroll = currentScroll;
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Add cursor trail effect
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }

        // Remove old trails
        cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);
    }
});

// Glitch effect on hover for certain elements
const glitchElements = document.querySelectorAll('.glitch, .glitch-title');
glitchElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// Random glitch effect on page elements
function randomGlitch() {
    const glitchables = document.querySelectorAll('.section-title, .stat-number, h3');
    const randomElement = glitchables[Math.floor(Math.random() * glitchables.length)];

    if (randomElement) {
        randomElement.style.textShadow = '2px 0 #ff0040, -2px 0 #0ff';
        setTimeout(() => {
            randomElement.style.textShadow = '';
        }, 100);
    }
}

// Trigger random glitches occasionally
setInterval(randomGlitch, 3000);

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated
        document.body.style.animation = 'glitch-anim 0.3s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎮 ACCESS LEVEL: GOD MODE ACTIVATED 🎮\n\nYou have discovered the secret. Welcome to the inner circle, fellow hacker.');
        }, 1000);
        konamiCode = [];
    }
});

// Console message for curious visitors
console.log('%c⚠️ WARNING: UNAUTHORIZED ACCESS DETECTED', 'color: #ff0040; font-size: 20px; font-weight: bold;');
console.log('%c🔐 System Security Active', 'color: #00ff41; font-size: 16px;');
console.log('%cIf you\'re reading this, you\'re already too deep...', 'color: #0ff; font-size: 14px;');
console.log('%c\nWelcome, fellow hacker. Looking for Easter eggs? Try the Konami Code... 👾', 'color: #888; font-size: 12px; font-style: italic;');

// Prevent right-click (optional - hacker theme)
// Uncomment if you want to add this effect
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
//     alert('🚫 Access Denied: Right-click disabled in secure zone');
// });

console.log('%c\n[UNKNOWN] © 2026 | All systems operational', 'color: #00ff41; font-size: 12px;');
