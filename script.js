// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Homepage Preloader Animation
    const hpPreloader = document.getElementById('hpPreloader');
    const hpPreloaderBg = document.getElementById('hpPreloaderBg');
    const hpWipePanels = hpPreloader ? hpPreloader.querySelectorAll('.hp-wipe-panel') : [];
    const hpPreloaderText = document.getElementById('hpPreloaderText');
    if (hpPreloader && hpWipePanels.length > 0) {
        // Prevent scrolling during transition
        document.body.style.overflow = 'hidden';
        // Ensure panels start at bottom
        hpWipePanels.forEach(panel => {
            panel.style.transition = 'none';
            panel.style.transform = 'translateY(100%)';
        });
        // Trigger reflow
        void hpWipePanels[0].offsetWidth;
        setTimeout(() => {
            // 1. Slide panels up to cover the screen (0%)
            hpWipePanels.forEach((panel, index) => {
                panel.style.transition = `transform 0.6s cubic-bezier(0.85, 0, 0.15, 1) ${index * 0.1}s`;
                panel.style.transform = 'translateY(0%)';
            });
            // 2. When screen is covered by panels, hide the white background behind them and show text
            setTimeout(() => {
                if (hpPreloaderBg) hpPreloaderBg.style.display = 'none'; // Hide solid background so we see website when red leaves
                if (hpPreloaderText) {
                    hpPreloaderText.classList.add('is-visible');
                }
                // 3. Wait a moment, hide the text
                setTimeout(() => {
                    if (hpPreloaderText) {
                        hpPreloaderText.classList.remove('is-visible');
                    }
                    // 4. Slide panels up to reveal the website (-100%)
                    setTimeout(() => {
                        hpWipePanels.forEach((panel, index) => {
                            panel.style.transform = 'translateY(-100%)';
                        });
                        // 5. Cleanup classes and restore scroll behavior
                        setTimeout(() => {
                            hpPreloader.style.display = 'none';
                            document.body.style.overflow = '';
                            // Dispatch scroll event to fix any sticky elements
                            window.dispatchEvent(new Event('scroll'));
                        }, 900);
                    }, 300); // Wait for text fade out
                }, 1000); // Text visible duration
            }, 900); // Time to cover screen
        }, 500); // Initial delay to show the solid screen before red wipes up
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Add subtle interactive tilt effect to bento boxes for a premium feel
    const boxes = document.querySelectorAll('.bento-box');
    
    boxes.forEach(box => {
        // Skip wrapper elements
        if (box.classList.contains('intro-wrapper')) return;

        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate gentle 3D rotation based on mouse position
            // Reduced rotation values to keep it very subtle and premium
            const xRotation = ((y - rect.height / 2) / rect.height) * 4; 
            const yRotation = ((x - rect.width / 2) / rect.width) * -4;
            
            box.style.transform = `perspective(1000px) scale(1.01) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        });
        
        box.addEventListener('mouseleave', () => {
            // Reset transform on mouse leave
            box.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
        });
    });

    // Copy email to clipboard feature
    const emailTag = document.querySelector('a[href^="mailto:"]');
    if (emailTag) {
        emailTag.addEventListener('click', (e) => {
            // Prevent default mailto behavior if we want to copy instead
            // For now, let mailto work naturally, but add a visual click effect
            e.currentTarget.style.transform = "scale(0.95)";
            setTimeout(() => {
                e.currentTarget.style.transform = "";
            }, 150);
        });
    }

    // Gradient Toggle Logic
    const toggle = document.getElementById('gradientToggle');
    if (toggle) {
        toggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('rainbow-mode');
            } else {
                document.body.classList.remove('rainbow-mode');
            }
        });
    }

    // Scroll Reveal Animation for Bento Boxes
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    boxes.forEach((box, index) => {
        if (index < 3) {
            // Force reveal the top elements to prevent blank space on load
            setTimeout(() => {
                box.classList.add('reveal-visible');
            }, index * 150 + 100); // Slight stagger for the initial load
        } else {
            revealObserver.observe(box);
        }
    });
});
