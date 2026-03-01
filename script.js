document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Background Slider Automation ---
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealFunction = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealFunction);

    // Trigger once on load
    revealFunction();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Collections Modal Logic ---
    const collectionsData = {
        'two-piece': {
            title: '2-Piece Suits',
            desc: 'Durable, wrinkle-free blends offering maximum comfort and a sharp silhouette for daily elegance.',
            variants: [
                { name: 'Charcoal Grey', color: '#36454F' },
                { name: 'Navy Blue', color: '#000080' },
                { name: 'Classic Black', color: '#000000' },
                { name: 'Deep Maroon', color: '#800000' }
            ]
        },
        'three-piece': {
            title: '3-Piece Suits',
            desc: 'Luxuriously crafted suits curated for all formal occasions, giving you an exquisite classic feel.',
            variants: [
                { name: 'Midnight Blue', color: '#191970' },
                { name: 'Slate Grey', color: '#708090' },
                { name: 'Jet Black', color: '#343434' },
                { name: 'Olive Green', color: '#556B2F' }
            ]
        },
        'blazers': {
            title: 'Premium Blazers',
            desc: 'The finest cuts with impeccable finishing, making a statement of ultimate grace for casual or business meetings.',
            variants: [
                { name: 'Camel Brown', color: '#C19A6B' },
                { name: 'Textured Grey', color: '#A9A9A9' },
                { name: 'Navy Check', color: '#1A2421' },
                { name: 'Cream Velvet', color: '#FFFDD0' }
            ]
        }
    };

    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const colorVariants = document.getElementById('color-variants');

    // Open Modal Handlers
    document.querySelectorAll('.open-modalBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default if any
            const category = e.currentTarget.getAttribute('data-category');
            const data = collectionsData[category];

            if (data) {
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;

                colorVariants.innerHTML = ''; // Clear previous

                data.variants.forEach(variant => {
                    // Border for white shades so they don't blend with background completely
                    const needsBorder = ['#FFFFFF', '#FAF9F6', '#FFFDD0', '#FFFFF0'].includes(variant.color);
                    const borderStyle = needsBorder ? 'border: 1px solid rgba(255,255,255,0.2);' : '';

                    colorVariants.innerHTML += `
                        <div class="color-item">
                            <div class="color-swatch" style="background-color: ${variant.color}; ${borderStyle}"></div>
                            <p>${variant.name}</p>
                            <button class="buy-btn" onclick="alert('Adding ${variant.name} ${data.title} to cart...')">Order Now</button>
                        </div>
                    `;
                });

                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });

    // Close Modal Handlers
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on clicking outside modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
