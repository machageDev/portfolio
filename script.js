// Load section content
document.addEventListener('DOMContentLoaded', function() {
    loadSection('hero', '.hero');
    loadSection('about', '.about');
    loadSection('skills', '.skills');
    loadSection('projects', '.projects');
    loadSection('contact', '.contact');
    
    initializeApp();
});

// Function to load section content
function loadSection(sectionName, containerSelector) {
    fetch(`sections/${sectionName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.querySelector(containerSelector).innerHTML = html;
            // Re-initialize animations after content load
            initializeAnimations();
        })
        .catch(error => {
            console.error('Error loading section:', error);
            document.querySelector(containerSelector).innerHTML = `
                <div class="container">
                    <h2>Error Loading Content</h2>
                    <p>Unable to load the ${sectionName} section. Please try again later.</p>
                </div>
            `;
        });
}

// Initialize application
function initializeApp() {
    initializeAnimations();
    initializeSmoothScrolling();
    initializeMobileMenu();
    initializeFormHandling();
}

// Fade in animation on scroll
function initializeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Check on load
    fadeInOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', fadeInOnScroll);
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav')) {
                navLinks.classList.remove('active');
            }
        });
    }
}

// Form handling
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
}