// DOM Elements
const nav = document.querySelector('nav');
const menuBtn = document.querySelector('.menu-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.menu');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');
const scrollTop = document.querySelector('.scroll-top');
const skillBars = document.querySelectorAll('.skill-percentage');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

// Sticky Navigation
window.addEventListener('scroll', function() {
    nav.classList.toggle('sticky', window.scrollY > 0);
    scrollTop.classList.toggle('active', window.scrollY > 500);
});

// Mobile Menu Toggle
menuBtn.onclick = function() {
    menu.classList.add('active');
    menuBtn.classList.add('hide');
}

cancelBtn.onclick = function() {
    menu.classList.remove('active');
    menuBtn.classList.remove('hide');
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.menu li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        menu.classList.remove('active');
        menuBtn.classList.remove('hide');
    });
});

// Theme Toggle
// Check for saved user preference or use preferred color scheme
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top functionality
scrollTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars when they come into view
function animateSkillBars() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent;
        }
    });
}

// Run once on page load
animateSkillBars();

// Run on scroll
window.addEventListener('scroll', animateSkillBars);

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// GitHub Repository Fetching
async function fetchGitHubRepo(repoName, elementId) {
    try {
        const response = await fetch(`https://api.github.com/repos/rachitsharma300/${repoName}`);
        const data = await response.json();
        
        const repoCard = document.getElementById(elementId);
        if (repoCard && data.name) {
            repoCard.querySelector('h3').textContent = data.name;
            repoCard.querySelector('.repo-description').textContent = data.description || 'No description provided';
            repoCard.querySelector('.stars .count').textContent = data.stargazers_count;
            repoCard.querySelector('.forks .count').textContent = data.forks_count;
            repoCard.querySelector('.updated .date').textContent = new Date(data.updated_at).toLocaleDateString();
            repoCard.querySelector('.repo-link').href = data.html_url;
        }
    } catch (error) {
        console.error('Error fetching GitHub repo:', error);
        const repoCard = document.getElementById(elementId);
        if (repoCard) {
            repoCard.querySelector('h3').textContent = 'Java Full Stack Learning';
            repoCard.querySelector('.repo-description').textContent = 'My Java full stack learning journey and projects';
            repoCard.querySelector('.repo-link').href = 'https://github.com/rachitsharma300/java-full-stack-learning';
        }
    }
}

// Call this function when page loads
window.addEventListener('load', () => {
    fetchGitHubRepo('java-full-stack-learning', 'java-full-stack-learning-repo');
    // Add more calls for additional repositories if needed
});