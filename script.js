document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. TYPEWRITER EFFECT
       ========================================== */
    const typewriter = document.getElementById('typewriter-text');
    const words = ["Full Stack Developer", "CSE Undergraduate at NITW'29","Data Science Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let deletingDelay = 50;
    let wordSpacingDelay = 1500;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = deletingDelay;
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = wordSpacingDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 500;
        }

        setTimeout(type, typingDelay);
    }
    
    if (typewriter) {
        setTimeout(type, 1000);
    }

    /* ==========================================
       2. STICKY NAVBAR CLASS TOGGLE
       ========================================== */
    const navbar = document.getElementById('mainNavbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on startup

    /* ==========================================
       3. INTERACTIVE SCROLL REVEAL ANIMATIONS
       ========================================== */
    // Helper to apply classes dynamically to keep HTML cleaner
    const animateSelectors = [
        { selector: '.section-title', anim: 'reveal-up' },
        { selector: '.section-subtitle', anim: 'reveal-up' },
        { selector: '.divider', anim: 'reveal-up' },
        { selector: '.about-visual', anim: 'reveal-left' },
        { selector: '.about-text', anim: 'reveal-right' },
        { selector: '.timeline-item.left-item', anim: 'reveal-left' },
        { selector: '.timeline-item.right-item', anim: 'reveal-right' },
        { selector: '.skill-category-card', anim: 'reveal-up' },
        { selector: '.project-card', anim: 'reveal-up' },
        { selector: '.stat-card', anim: 'reveal-up' },
        { selector: '.dsa-insights-card', anim: 'reveal-up' },
        { selector: '.glass-card', anim: 'reveal-up' },
        { selector: '.contact-info-card', anim: 'reveal-left' },
        { selector: '.contact-form-card', anim: 'reveal-right' }
    ];

    animateSelectors.forEach(({ selector, anim }) => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal', anim);
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Trigger animation once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================
       4. CONTACT FORM INTEGRATION
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values (can be used to submit to backend or API)
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            // Form Submit visual response
            const submitBtn = document.getElementById('btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending <i class="fa-solid fa-circle-notch fa-spin ms-2"></i>';
            emailjs.send("service_7b3gmjf","template_f0ul6rq",{
                  from_name: document.getElementById("contactName").value,
        from_email: document.getElementById("contactEmail").value,
        subject: document.getElementById("contactSubject").value,
        message: document.getElementById("contactMessage").value
            })
            
            .then(() => {

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        formFeedback.classList.remove("d-none");
        contactForm.reset();

        setTimeout(() => {
            formFeedback.classList.add("d-none");
        }, 5000);

    })
    .catch((error) => {

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        alert("Failed to send message.");
        console.error(error);

    });
        });
    }

    /* ==========================================
       5. SMOOTH SCROLL OFFSET FOR ANCHOR LINKS
       ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Collapse bootstrap mobile navbar menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                }
            }
        });
    });

});
