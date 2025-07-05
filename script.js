// DOM Elements
const typingTextElement = document.getElementById('typing-text');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const projectsContainer = document.getElementById('projects-container');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const currentYearElement = document.getElementById('current-year');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create geometric shapes for background
    createGeometricShapes();

    // Initialize AOS animations with custom settings
    AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom',
        disable: window.innerWidth < 768 ? 'phone' : false,
    });

    // Set current year in footer
    currentYearElement.textContent = new Date().getFullYear();

    // Start typing animation
    initTypeEffect();

    // Set up smooth scrolling for navigation
    setupSmoothScrolling();

    // Set up mobile menu toggle
    setupMobileMenu();

    // Set up interactive elements
    setupInteractiveElements();

    // Fetch GitHub repositories
    fetchGitHubRepos();

    // Add cool hover effects to buttons
    addButtonEffects();

    // Add shape animations
    animateShapes();

    // Add particle background if supported
    if (window.innerWidth > 768) {
        initParticleBackground();
    }
});

// Create geometric shapes for visual interest
function createGeometricShapes() {
    const colors = [
        'rgba(255, 94, 98, 0.5)',
        'rgba(116, 89, 234, 0.5)',
        'rgba(0, 210, 255, 0.5)'
    ];

    const shapeContainers = document.querySelectorAll('.shape-container');

    shapeContainers.forEach(container => {
        // Create 2-3 random shapes per container
        const numShapes = Math.floor(Math.random() * 2) + 2;

        for (let i = 0; i < numShapes; i++) {
            const shape = document.createElement('div');
            const isCircle = Math.random() > 0.5;

            shape.className = `geometric-shape ${isCircle ? 'circle' : 'rect'}`;
            shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Random position within container
            shape.style.top = `${Math.random() * 80}%`;
            shape.style.left = `${Math.random() * 80}%`;
            shape.style.opacity = `${Math.random() * 0.3 + 0.1}`;

            container.appendChild(shape);
        }
    });
}

// Animate geometric shapes subtly
function animateShapes() {
    const shapes = document.querySelectorAll('.geometric-shape');

    shapes.forEach((shape, index) => {
        // Different animation for each shape
        const duration = Math.random() * 20 + 20;
        const delay = index * -3;

        shape.style.animation = `float ${duration}s ${delay}s infinite alternate ease-in-out`;
    });

    // Add floating animation keyframes if not already in stylesheet
    if (!document.getElementById('shape-animation')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'shape-animation';
        styleSheet.textContent = `
            @keyframes float {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(5px, 5px) rotate(2deg); }
                50% { transform: translate(-5px, 10px) rotate(-2deg); }
                75% { transform: translate(-10px, -5px) rotate(1deg); }
                100% { transform: translate(10px, -10px) rotate(-1deg); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Add particle background for desktop
function initParticleBackground() {
    const particleScript = document.createElement('script');
    particleScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    particleScript.onload = () => {
        const particleContainer = document.createElement('div');
        particleContainer.id = 'particles-js';
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.zIndex = '-2';
        document.body.prepend(particleContainer);

        // Configure particles
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 30,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.1,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.05,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.3
                        }
                    }
                }
            },
            "retina_detect": true
        });
    };
    document.head.appendChild(particleScript);
}

// Add hover effects to buttons
function addButtonEffects() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const x = e.clientX - button.getBoundingClientRect().left;
            const y = e.clientY - button.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.top = `${y}px`;
            ripple.style.left = `${x}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple style if not present
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            .button {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Typing animation with fixed width container
function initTypeEffect() {
    const phrases = ["Developer", "Tech Enthusiast", "Problem Solver", "Continuous Learner"];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // Add typing cursor
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typing-cursor';
    typingTextElement.parentNode.appendChild(cursorSpan);

    // Make sure the typing container has fixed dimensions
    const container = typingTextElement.parentNode;
    container.classList.add('typing-container');

    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isDeleting) {
            // Deleting text
            typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 40; // Faster when deleting
        } else {
            // Typing text
            typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 120; // Slower when typing
        }

        // If word is complete, start deleting after pause
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1200; // Pause at end of word
        }

        // If deletion is complete, move to next word
        if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 600; // Pause before starting new word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start the typing effect
    typeEffect();
}

// Mobile menu toggle functionality
function setupMobileMenu() {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        // Animate the menu icon
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if href is just "#"

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');

                // Smooth scroll to target with offset for navbar
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: targetPosition - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add interactive effects to various elements
function setupInteractiveElements() {
    // Animate sections on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - window.innerHeight + 150;
            if (scrollY > sectionTop) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    // Add tilt effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
            const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1

            // Subtle tilt effect
            card.style.transform = `perspective(1000px) rotateY(${xPercent * 5}deg) rotateX(${-yPercent * 5}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        });
    });

    // Add hover effects to skill pills
    document.querySelectorAll('.tech-pill').forEach(pill => {
        // Random color for each pill
        const colors = ['#ff5e62', '#7459ea', '#00d2ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        pill.addEventListener('mouseenter', () => {
            pill.style.borderColor = randomColor;
            pill.style.boxShadow = `0 5px 15px ${randomColor}33`;
        });

        pill.addEventListener('mouseleave', () => {
            pill.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            pill.style.boxShadow = 'none';
        });
    });
}

// Function to fetch GitHub repositories
async function fetchGitHubRepos() {
    const username = 'harshitpawar64';

    try {
        // Show loading message
        loadingMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }
        const repos = await response.json();

        // Clear loading message
        loadingMessage.classList.add('hidden');

        // Sort repositories by updated_at in descending order
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Display only the first 6 repositories
        const topRepos = repos.slice(0, 6);

        if (topRepos.length === 0) {
            projectsContainer.innerHTML = '<p class="col-span-full text-center text-slate-400">No public repositories found.</p>';
            return;
        }

        // Clear the container before adding new content
        projectsContainer.innerHTML = '';

        // Add each repository with animation delay
        topRepos.forEach((repo, index) => {
            const delay = index * 100;

            const repoCard = document.createElement('div');
            repoCard.className = 'project-card';
            repoCard.setAttribute('data-aos', 'fade-up');
            repoCard.setAttribute('data-aos-delay', delay.toString());

            // Format the date
            const updatedDate = new Date(repo.updated_at);
            const formattedDate = updatedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Language color mapping
            const languageColors = {
                'JavaScript': '#f1e05a',
                'TypeScript': '#2b7489',
                'Python': '#3572A5',
                'HTML': '#e34c26',
                'CSS': '#563d7c',
                'Java': '#b07219',
                'C': '#555555',
                'C++': '#f34b7d',
                'Ruby': '#701516',
                'PHP': '#4F5D95',
                'Go': '#00ADD8'
            };

            const languageColor = repo.language ? languageColors[repo.language] || '#00d2ff' : '#00d2ff';

            repoCard.innerHTML = `
                <div class="neon-highlight"></div>
                <h3 class="text-xl font-bold text-white mb-2">${repo.name}</h3>
                <p class="text-base text-gray-300 mb-4 min-h-[60px]">${repo.description || 'No description provided.'}</p>
                <div class="flex items-center text-gray-400 text-xs mb-4">
                    ${repo.language ?
                        `<span class="mr-4 flex items-center">
                            <span class="language-dot" style="background-color: ${languageColor}"></span>
                            ${repo.language}
                         </span>`
                        : ''}
                    <span class="mr-4 flex items-center">
                        <i class="fas fa-star mr-1 text-yellow-500"></i>
                        ${repo.stargazers_count}
                    </span>
                    <span class="flex items-center">
                        <i class="fas fa-code-branch mr-1 text-blue-400"></i>
                        ${repo.forks_count}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-400 text-xs flex items-center">
                        <i class="far fa-calendar-alt mr-1"></i>
                        ${formattedDate}
                    </span>
                    <a href="${repo.html_url}" target="_blank" class="button button-primary text-sm px-4 py-2 rounded-md">
                        <i class="fas fa-external-link-alt mr-1"></i>
                        View
                    </a>
                </div>
            `;

            projectsContainer.appendChild(repoCard);
        });

        // Refresh AOS to detect new elements
        AOS.refresh();

        // Add tilt effect to newly created cards
        setupInteractiveElements();

    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        loadingMessage.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;

    // Progress indicator
    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-progress', `${Math.min(scrollPercentage, 100)}%`);

    // Parallax effect for header elements
    const headerElements = document.querySelectorAll('.parallax');
    headerElements.forEach((element, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const speed = element.getAttribute('data-speed') || 0.1;
        element.style.transform = `translateY(${scrollPosition * speed * direction}px)`;
    });
});
