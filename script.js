// Smooth scroll behavior and active nav link highlighting

document.addEventListener('DOMContentLoaded', () => {
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Update active nav link on scroll
    function updateActiveNavLink() {
        let current = 'home';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavLink);

    // Smooth scroll for nav links (backup for browsers that don't support CSS scroll-behavior)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for sticky nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover glow effect to cards
    const cards = document.querySelectorAll('.gdd-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Initial call to set active link on page load
    updateActiveNavLink();

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Open lightbox when clicking on concept images
    document.querySelectorAll('.concept-image').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox when clicking X
    lightboxClose.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Tab switching function for concept art section
function switchTab(projectId) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.art-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.art-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to selected tab using data attribute
    const selectedTab = document.querySelector(`.art-tab[data-project="${projectId}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to selected content
    const selectedContent = document.getElementById(`${projectId}-art`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
}

