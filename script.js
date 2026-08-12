document.addEventListener('DOMContentLoaded', () => {

    // 0. Opening Animation
    const opening = document.querySelector('.opening');
    if (opening) {
        // Wait a bit to show the animation, then hide
        setTimeout(() => {
            opening.classList.add('is-hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                opening.remove();
            }, 1000);
        }, 1500); // 1.5s display time
    }

    // 1. Smooth Scrolling
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // If it's just "#", do nothing or scroll to top
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 1.5 Scroll Animation (Intersection Observer)
    const fadeUpElements = document.querySelectorAll('.js-fade-up');
    if (fadeUpElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-inview');
                    // Optional: unobserve after showing
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0
        });

        fadeUpElements.forEach(el => {
            observer.observe(el);
        });
    }

    // 2. FAQ Accordion
    const faqToggles = document.querySelectorAll('.js-faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Toggle the current item
            this.classList.toggle('is-open');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('is-open')) {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });

    // 3. Fixed Bottom CTA (SP) visibility control
    const fixedCta = document.querySelector('.js-fixed-cta');
    const fvSection = document.querySelector('.fv');
    
    if (fixedCta && fvSection) {
        window.addEventListener('scroll', () => {
            // Show after scrolling past the FV section
            const fvBottom = fvSection.getBoundingClientRect().bottom;
            
            if (fvBottom < 0) {
                fixedCta.classList.add('is-visible');
            } else {
                fixedCta.classList.remove('is-visible');
            }
        });
    }

});
