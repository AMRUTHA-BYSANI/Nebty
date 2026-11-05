/**
 * Nebty Digital Agency - Main Interactive Scripts
 * Handles Theme Toggling, Smooth Scrolling, Animated Typing, Drawer, Dialogs & Filters
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Theme Toggle (Dark / Light Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Detect stored preference or system default
    const storedTheme = localStorage.getItem('nebty-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'dark'); // Default dark
    htmlElement.setAttribute('data-theme', initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('nebty-theme', nextTheme);
        });
    }

    /* ==========================================================================
       2. Sticky Header & Active Nav Spy
       ========================================================================== */
    const siteHeader = document.getElementById('header');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky blur effect
        if (scrollPos > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }

        // Active link spy
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });

    /* ==========================================================================
       3. Hero Typing Text Animation
       ========================================================================== */
    const typedTarget = document.getElementById('typedTarget');
    if (typedTarget) {
        const phrases = [
            "Visionary Brands",
            "High-Growth Enterprises",
            "Next-Gen Web Platforms",
            "Bespoke Mobile Ecosystems",
            "Generative AI & Search (GEO)",
            "Measurable Revenue Scale"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 110;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 45;
            } else {
                typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 90;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at complete word
                isDeleting = true;
                typingDelay = 2200;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingDelay = 400;
            }

            setTimeout(typeLoop, typingDelay);
        }

        typeLoop();
    }

    /* ==========================================================================
       4. Side Offcanvas Drawer (Contact & Founders Info)
       ========================================================================== */
    const sideDrawer = document.getElementById('sideDrawer');
    const openDrawerBtn = document.getElementById('openDrawerBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');

    function openDrawer() {
        if (sideDrawer) {
            sideDrawer.classList.add('open');
            sideDrawer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeDrawer() {
        if (sideDrawer) {
            sideDrawer.classList.remove('open');
            sideDrawer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Escape key closes drawer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideDrawer && sideDrawer.classList.contains('open')) {
            closeDrawer();
        }
    });

    /* ==========================================================================
       5. Mobile Navigation Panel
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavPanel = document.getElementById('mobileNavPanel');
    const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMobileNav() {
        if (mobileNavPanel) {
            mobileNavPanel.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileNav() {
        if (mobileNavPanel) {
            mobileNavPanel.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
    if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    /* ==========================================================================
       6. Portfolio Filter Bar
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    /* ==========================================================================
       7. Animated Number Counters
       ========================================================================== */
    const counterElements = document.querySelectorAll('.count-up');
    let hasCounted = false;

    function runCounters() {
        counterElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const duration = 1800;
            const stepTime = 30;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    const metricsSection = document.querySelector('.success-metrics-section');
    if (metricsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    hasCounted = true;
                    runCounters();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(metricsSection);
    }

    /* ==========================================================================
       8. FAQ Accordion
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-accordion-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const answer = item.querySelector('.faq-answer');

        if (trigger && answer) {
            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Close all others
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                    const otherTrigger = otherItem.querySelector('.faq-trigger');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.style.maxHeight = '0px';
                });

                // Toggle current
                if (!isOpen) {
                    item.classList.add('open');
                    trigger.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
                }
            });
        }
    });

    /* ==========================================================================
       9. Accessible Native Dialog: Get Free Quote
       ========================================================================== */
    const quoteDialog = document.getElementById('quoteDialog');
    const openQuoteModalBtn = document.getElementById('openQuoteModalBtn');
    const mobileQuoteBtn = document.getElementById('mobileQuoteBtn');
    const closeQuoteModalBtn = document.getElementById('closeQuoteModalBtn');

    function openQuoteModal() {
        if (quoteDialog && typeof quoteDialog.showModal === 'function') {
            quoteDialog.showModal();
            document.body.style.overflow = 'hidden';
        }
    }

    function closeQuoteModal() {
        if (quoteDialog && typeof quoteDialog.close === 'function') {
            quoteDialog.close();
            document.body.style.overflow = '';
        }
    }

    if (openQuoteModalBtn) openQuoteModalBtn.addEventListener('click', openQuoteModal);
    if (mobileQuoteBtn) {
        mobileQuoteBtn.addEventListener('click', () => {
            closeMobileNav();
            openQuoteModal();
        });
    }
    if (closeQuoteModalBtn) closeQuoteModalBtn.addEventListener('click', closeQuoteModal);

    // Light dismiss for <dialog> (clicking outside the dialog body)
    if (quoteDialog) {
        quoteDialog.addEventListener('click', (e) => {
            const rect = quoteDialog.getBoundingClientRect();
            const isInDialog = (
                rect.top <= e.clientY &&
                e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX &&
                e.clientX <= rect.left + rect.width
            );
            if (!isInDialog) {
                closeQuoteModal();
            }
        });

        quoteDialog.addEventListener('close', () => {
            document.body.style.overflow = '';
        });
    }

    /* ==========================================================================
       10. Interactive Contact Form & WhatsApp Submission
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatusMsg = document.getElementById('formStatusMsg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('userName')?.value.trim();
            const email = document.getElementById('userEmail')?.value.trim();
            const phone = document.getElementById('userPhone')?.value.trim();
            const service = document.getElementById('userService')?.value;
            const message = document.getElementById('userMessage')?.value.trim();

            if (!name || !email || !phone || !message) {
                if (formStatusMsg) {
                    formStatusMsg.className = 'form-status-msg error';
                    formStatusMsg.textContent = 'Please fill out all required fields.';
                }
                return;
            }

            // Simulate instant confirmation
            if (formStatusMsg) {
                formStatusMsg.className = 'form-status-msg success';
                formStatusMsg.textContent = `Thank you, ${name}! Your inquiry has been routed to founders Amrutha and Praneetha. Opening WhatsApp connect...`;
            }

            // Prepare WhatsApp pre-filled link to founder
            const waText = encodeURIComponent(
                `Hello Amrutha & Praneetha, my name is ${name}. I am interested in ${service || 'Nebty services'}. Phone: ${phone}, Email: ${email}. Details: ${message}`
            );
            const waUrl = `https://wa.me/919515510478?text=${waText}`;

            setTimeout(() => {
                contactForm.reset();
                window.open(waUrl, '_blank');
            }, 1000);
        });
    }

    // Dialog quick form
    const dialogForm = document.getElementById('dialogForm');
    if (dialogForm) {
        dialogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('dlgName')?.value.trim();
            const phone = document.getElementById('dlgPhone')?.value.trim();
            const service = document.getElementById('dlgService')?.value;
            const notes = document.getElementById('dlgNotes')?.value.trim();

            const waText = encodeURIComponent(
                `Hi Nebty (Amrutha/Praneetha), I request a callback. Name: ${name}, Phone: ${phone}, Service: ${service}. Notes: ${notes}`
            );
            window.open(`https://wa.me/919515510478?text=${waText}`, '_blank');
            closeQuoteModal();
            dialogForm.reset();
        });
    }

    /* ==========================================================================
       11. Dynamic Year Update
       ========================================================================== */
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
