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

    // --- Mobile Menu Logic ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    // Create mobile menu overlay
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    mobileMenuOverlay.innerHTML = `
        <div class="close-mobile-btn">&times;</div>
        <div class="mobile-nav-links">
            <a href="index.html">Home</a>
            <a href="collections.html">Collections</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </div>
        <div class="mobile-contact-info" style="margin-top: 40px;">
            <a href="tel:03167612365" style="font-size: 16px; color: var(--accent);"><i class="fa-solid fa-phone"></i> 0316-7612365</a>
            <div style="margin-top: 20px; font-size: 14px; color: var(--text-muted);">
                <i class="fa-solid fa-envelope"></i> info@biniqbal.com<br><br>
                <i class="fa-solid fa-location-dot"></i> Lahore, Pakistan
            </div>
        </div>
    `;
    body.appendChild(mobileMenuOverlay);

    const closeMobileBtn = mobileMenuOverlay.querySelector('.close-mobile-btn');

    mobileBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        body.style.overflow = 'hidden';
    });

    closeMobileBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        body.style.overflow = 'auto';
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

    // --- Collections Modal Logic & Order System ---
    const collectionsData = {
        'two-piece': {
            title: '2-Piece Suits',
            desc: 'Durable, wrinkle-free blends offering maximum comfort and a sharp silhouette for daily elegance.',
            variants: [
                { name: 'Charcoal Grey', color: '#36454F', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80' },
                { name: 'Navy Blue', color: '#000080', img: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=500&q=80' },
                { name: 'Classic Black', color: '#000000', img: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=500&q=80' },
                { name: 'Deep Maroon', color: '#800000', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80' }
            ]
        },
        'three-piece': {
            title: '3-Piece Suits',
            desc: 'Luxuriously crafted suits curated for all formal occasions, giving you an exquisite classic feel.',
            variants: [
                { name: 'Midnight Blue', color: '#191970', img: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=500&q=80' },
                { name: 'Slate Grey', color: '#708090', img: 'https://images.unsplash.com/photo-1601618361546-f9d2d78d2b70?w=500&q=80' },
                { name: 'Jet Black', color: '#343434', img: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=500&q=80' },
                { name: 'Olive Green', color: '#556B2F', img: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=500&q=80' }
            ]
        },
        'blazers': {
            title: 'Premium Blazers',
            desc: 'The finest cuts with impeccable finishing, making a statement of ultimate grace for casual or business meetings.',
            variants: [
                { name: 'Camel Brown', color: '#C19A6B', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80' },
                { name: 'Textured Grey', color: '#A9A9A9', img: 'https://images.unsplash.com/photo-1601618361546-f9d2d78d2b70?w=500&q=80' },
                { name: 'Navy Check', color: '#1A2421', img: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=500&q=80' },
                { name: 'Cream Velvet', color: '#FFFDD0', img: 'https://plus.unsplash.com/premium_photo-1661339129524-eeb1823bbbb7?w=500&q=80' }
            ]
        }
    };

    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const colorVariants = document.getElementById('color-variants');
    const closeBtn = document.querySelector('.close-btn');
    
    // Checkout Elements
    const stepColors = document.getElementById('step-colors');
    const stepCheckout = document.getElementById('step-checkout');
    const backBtn = document.getElementById('back-to-colors');
    const selectedProductText = document.getElementById('selected-product');
    const orderForm = document.getElementById('order-form');

    let currentSelection = ''; // Track string like "Midnight Blue 3-Piece"

    // Open Modal Handlers
    document.querySelectorAll('.open-modalBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default if any
            const category = e.currentTarget.getAttribute('data-category');
            const data = collectionsData[category];

            if (data && modal) {
                // Reset views
                if(stepColors) stepColors.style.display = 'block';
                if(stepCheckout) stepCheckout.style.display = 'none';

                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;

                colorVariants.innerHTML = ''; // Clear previous

                data.variants.forEach(variant => {
                    // Border for white shades so they don't blend with background completely
                    const needsBorder = ['#FFFFFF', '#FAF9F6', '#FFFDD0', '#FFFFF0'].includes(variant.color);
                    const borderStyle = needsBorder ? 'border: 1px solid rgba(255,255,255,0.2);' : '';

                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'color-item';
                    itemDiv.innerHTML = `
                        <div class="color-img" style="background-image: url('${variant.img}')"></div>
                        <div class="color-swatch-small" style="background-color: ${variant.color}; ${borderStyle}"></div>
                        <p>${variant.name}</p>
                        <button class="buy-btn" data-product="${variant.name} ${data.title}">Order Now</button>
                    `;
                    colorVariants.appendChild(itemDiv);
                });

                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });

    // Handle "Order Now" Clicks Inside Modal
    if (colorVariants) {
        colorVariants.addEventListener('click', (e) => {
            if (e.target.classList.contains('buy-btn')) {
                currentSelection = e.target.getAttribute('data-product');
                selectedProductText.textContent = currentSelection;
                
                // Switch View via JS
                stepColors.style.display = 'none';
                stepCheckout.style.display = 'block';
                
                // Clear Form Fields
                orderForm.reset();
            }
        });
    }

    // Handle Back Button
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            stepCheckout.style.display = 'none';
            stepColors.style.display = 'block';
        });
    }

    // Handle Order Submission
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get data
            const orderRecord = {
                id: 'ORD-' + Date.now().toString().slice(-6),
                date: new Date().toLocaleDateString(),
                product: currentSelection,
                name: document.getElementById('fullName').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                country: 'Pakistan',
                status: 'Pending'
            };

            // Save to LocalStorage (acting as simple DB for owner)
            let orders = JSON.parse(localStorage.getItem('binIqbalOrders')) || [];
            orders.unshift(orderRecord);
            localStorage.setItem('binIqbalOrders', JSON.stringify(orders));

            // Success feedback
            alert(`Thank you, ${orderRecord.name}! Your order ${orderRecord.id} has been placed successfully.`);
            closeModal();
            orderForm.reset();
        });
    }

    // Close Modal Handlers
    const closeModal = () => {
        if(modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    };

    if(closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on clicking outside modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Owner Access Logic (Hidden Feature: Press Ctrl + Shift + O anywhere)
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'O') {
            e.preventDefault();
            const pass = prompt('Admin Login: Enter Owner Password');
            if (pass === 'biniqbal123') { // Simple pass for demonstration
                let orders = JSON.parse(localStorage.getItem('binIqbalOrders')) || [];
                let orderText = '--- RECENT ORDERS ---\n\n';
                if (orders.length === 0) {
                    orderText += 'No orders received yet.';
                } else {
                    orders.forEach(o => {
                        orderText += `ID: ${o.id} | Date: ${o.date}\n`;
                        orderText += `Product: ${o.product}\n`;
                        orderText += `Customer: ${o.name} (${o.phone})\n`;
                        orderText += `Address: ${o.address}, ${o.city}\n`;
                        orderText += `--------------------\n`;
                    });
                }
                
                // Create a basic alert or open a new window to show orders
                const newWin = window.open('', '_blank');
                if (newWin) {
                    newWin.document.write(`<pre style="font-family: monospace; padding: 20px;">${orderText}</pre>`);
                    newWin.document.title = "Bin Iqbal Orders Database";
                } else {
                    alert(orderText); // Fallback
                }
            } else if (pass !== null) {
                alert('Access Denied');
            }
        }
    });

    // Testimonials slider logic (if exists in DOM)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    
    if(testimonials.length > 0) {
        setInterval(() => {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }, 6000);
    }
});
