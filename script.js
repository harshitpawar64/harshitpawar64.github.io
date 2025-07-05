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
    // Initialize AOS animations with custom settings
    AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
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

    // Add subtle parallax effect to blobs
    setupParallaxEffect();
});

// Subtle parallax effect for background elements
function setupParallaxEffect() {
    const blobs = document.querySelectorAll('.blob');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        blobs.forEach((blob, index) => {
            const speed = index % 2 === 0 ? 0.05 : -0.03;
            const offset = scrollY * speed;
            blob.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Typing animation
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

    // Add container class to parent to control width
    typingTextElement.parentNode.classList.add('typing-container');

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

                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for nav bar height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add interactive effects to various elements
function setupInteractiveElements() {
    // Add hover class to buttons
    document.querySelectorAll('a[href], button').forEach(button => {
        button.classList.add('btn');
    });

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
}

// Function to fetch GitHub repositories
async function fetchGitHubRepos() {
    const username = 'harshitpawar64';

    try {
        // Show loading message
        loadingMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden'); // Hide any previous error message

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
            const delay = index * 100; // Stagger the animations

            const repoCard = document.createElement('div');
            repoCard.className = 'card-hover bg-slate-700/50 p-6 rounded-lg shadow-lg border border-slate-600/50';
            repoCard.setAttribute('data-aos', 'fade-up');
            repoCard.setAttribute('data-aos-delay', delay.toString());

            // Format the date
            const updatedDate = new Date(repo.updated_at);
            const formattedDate = updatedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Create stars and forks badges with animations
            const starCount = repo.stargazers_count;
            const forkCount = repo.forks_count;

            repoCard.innerHTML = `
                <h3 class="text-xl font-semibold text-white mb-2">${repo.name}</h3>
                <p class="text-slate-300 text-sm mb-4" style="min-height: 40px;">${repo.description || 'No description provided.'}</p>
                <div class="flex items-center text-slate-400 text-xs mb-4">
                    ${repo.language ? `<span class="mr-4"><span class="inline-block w-3 h-3 rounded-full bg-blue-400 mr-1"></span>${repo.language}</span>` : ''}
                    <span class="mr-4"><i class="fas fa-star mr-1"></i>${starCount}</span>
                    <span><i class="fas fa-code-branch mr-1"></i>${forkCount}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-slate-400 text-xs"><i class="far fa-calendar-alt mr-1"></i> ${formattedDate}</span>
                    <a href="${repo.html_url}" target="_blank" class="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                        <i class="fas fa-external-link-alt mr-1"></i> View
                    </a>
                </div>
            `;

            projectsContainer.appendChild(repoCard);
        });

        // Refresh AOS to detect new elements
        AOS.refresh();

    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        loadingMessage.classList.add('hidden');
        errorMessage.classList.remove('hidden'); // Show error message
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
});
