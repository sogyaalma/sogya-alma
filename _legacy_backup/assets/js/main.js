/**
 * Sogya Alma - Main JavaScript
 * Handles basic interactions, counter animations, and UI states.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('is-open');
        });
    }

    // 2. Counter Animation for Impact Dashboard via IntersectionObserver
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    // Format number depending on size
                    let displayValue = current;
                    if(target >= 1000000) displayValue = (current / 1000000).toFixed(1);
                    else displayValue = Math.ceil(current).toLocaleString('en-US');
                    
                    counter.innerText = displayValue + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    let finalDisplay = target;
                    if(target >= 1000000) finalDisplay = (target / 1000000).toFixed(1);
                    else finalDisplay = target.toLocaleString('en-US');
                    
                    counter.innerText = finalDisplay + suffix;
                }
            };
            updateCounter();
        });
    };

    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true;
        }
    }, { threshold: 0.5 });
    
    const dashboardSection = document.querySelector('.impact-dashboard');
    if(dashboardSection) observer.observe(dashboardSection);
    
    // 3. Smooth Scrolling for anchor links (Fixed Exception)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const dest = this.getAttribute('href');
            if(dest === "#") return; // Prevent DOMException on empty anchors
            
            e.preventDefault();
            const target = document.querySelector(dest);
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if(navLinks && navLinks.classList.contains('is-open')) {
                navLinks.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 4. Header Sticky state
    const header = document.querySelector('.official-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

});
