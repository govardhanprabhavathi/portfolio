// script.js
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
});
