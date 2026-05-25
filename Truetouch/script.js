   document.addEventListener('DOMContentLoaded', function () {
            const myCarousel = document.getElementById('heroCarousel');
            
            // Initialize Bootstrap Carousel
            const carousel = new bootstrap.Carousel(myCarousel, {
                interval: 5000,
                wrap: true,
                keyboard: true
            });

            // Function to handle fade-in animation on slide change
            const handleSlideChange = () => {
                // 1. Select all elements that need animation
                const animatedElements = document.querySelectorAll('.animate-fade-up');
                
                // 2. Remove the 'visible' class from all of them to reset their position (invisible, down)
                animatedElements.forEach(el => {
                    el.classList.remove('visible');
                });

                // 3. Find the currently active slide
                const activeSlide = document.querySelector('.carousel-item.active');
                
                // 4. If an active slide exists, find its children and add the 'visible' class
                if (activeSlide) {
                    const activeAnimatedElements = activeSlide.querySelectorAll('.animate-fade-up');
                    // Slight timeout to ensure the browser registers the class removal before adding it back
                    setTimeout(() => {
                        activeAnimatedElements.forEach(el => {
                            el.classList.add('visible');
                        });
                    }, 50); // 50ms delay
                }
            };

            // Listen for Bootstrap slide event (when transition starts)
            // We actually want to trigger the animation AFTER the slide has switched (slid.bs.carousel)
            myCarousel.addEventListener('slid.bs.carousel', function () {
                handleSlideChange();
            });

            // Trigger once on load for the first slide
            handleSlideChange();


            // Data Selectors
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlideIndex = 0;
        let autoPlayTimer;
        const autoPlayDelay = 5000; // 5 seconds

        // Function to show a specific slide
        function showSlide(index) {
            // Reset active classes
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(dot => dot.classList.remove('active'));

            // Handle wrapping
            if (index >= slides.length) {
                currentSlideIndex = 0;
            } else if (index < 0) {
                currentSlideIndex = slides.length - 1;
            } else {
                currentSlideIndex = index;
            }

            // Activate new slide and indicator
            slides[currentSlideIndex].classList.add('active');
            indicators[currentSlideIndex].classList.add('active');
        }

        // Next/Previous Controls
        function moveSlide(step) {
            showSlide(currentSlideIndex + step);
            resetAutoPlay();
        }

        // Direct Indicator Click
        function currentSlide(index) {
            showSlide(index);
            resetAutoPlay();
        }

        // Autoplay Logic
        function startAutoPlay() {
            autoPlayTimer = setInterval(() => {
                moveSlide(1);
            }, autoPlayDelay);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayTimer);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }
        });



          document.addEventListener('DOMContentLoaded', function () {
            // Select all elements that need animation
            const animatedElements = document.querySelectorAll('.animate-on-scroll');

            // Create an Intersection Observer
            const observerOptions = {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.1 // Trigger when 10% of the element is visible
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Optional: Stop observing once animated
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe each element
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        });







         // Product Data: The 4 described items + 4 generated items to make 8
        const products = [
            {
                id: 1,
                title: "Vitamin D3 Complex",
                category: "Supplements",
                price: 12500,
                rating: 4.8,
                sold: 1200,
                badge: "Best Seller",
                badgeClass: "badge-best",
                imgSeed: "vitamind"
            },
            {
                id: 2,
                title: "Daily Multivitamin",
                category: "Vitamins",
                price: 9500,
                rating: 4.5,
                sold: 850,
                badge: null,
                badgeClass: "",
                imgSeed: "multi"
            },
            {
                id: 3,
                title: "Omega - 3 Fish Oil",
                category: "Supplements",
                price: 18500,
                rating: 4.9,
                sold: 2100,
                badge: "Sale",
                badgeClass: "badge-sale",
                imgSeed: "omega"
            },
            {
                id: 4,
                title: "First Aid Kit Pro",
                category: "Medical Supplies",
                price: 27500,
                rating: 4.7,
                sold: 450,
                badge: "New",
                badgeClass: "badge-new",
                imgSeed: "firstaid"
            },
            {
                id: 5,
                title: "Probiotic Blend",
                category: "Digestive Health",
                price: 14200,
                rating: 4.6,
                sold: 600,
                badge: "New",
                badgeClass: "badge-new",
                imgSeed: "probiotic"
            },
            {
                id: 6,
                title: "Turmeric Curcumin",
                category: "Supplements",
                price: 11000,
                rating: 4.8,
                sold: 1500,
                badge: "Sale",
                badgeClass: "badge-sale",
                imgSeed: "turmeric"
            },
            {
                id: 7,
                title: "Digital Thermometer",
                category: "Devices",
                price: 4500,
                rating: 4.3,
                sold: 3000,
                badge: null,
                badgeClass: "",
                imgSeed: "thermo"
            },
            {
                id: 8,
                title: "Blood Pressure Monitor",
                category: "Devices",
                price: 32000,
                rating: 4.9,
                sold: 900,
                badge: "Best Seller",
                badgeClass: "badge-best",
                imgSeed: "pressure"
            }
        ];

        // Helper function to generate stars
        function getStars(rating) {
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    starsHtml += '<i class="fas fa-star"></i>';
                } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                    starsHtml += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    starsHtml += '<i class="far fa-star"></i>';
                }
            }
            return starsHtml;
        }

        // Function to format currency (Using Japanese Yen based on prompt)
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
        };

        // Render Products
        const container = document.getElementById('products-container');

        products.forEach(product => {
            const badgeHtml = product.badge
                ? `<span class="badge ${product.badgeClass}">${product.badge}</span>`
                : '';

            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3'; // Responsive grid

            col.innerHTML = `
                <div class="product-card">
                    <div class="card-image-wrapper">
                        ${badgeHtml}
                        <button class="wishlist-btn" onclick="toggleWishlist(this, '${product.title}')" aria-label="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                        <!-- Using Picsum with seed to get consistent random images -->
                        <img src="https://picsum.photos/seed/${product.imgSeed}/300/300" alt="${product.title}">
                    </div>
                    <div class="card-body">
                        <div class="product-category">${product.category}</div>
                        <a href="#" class="product-title">${product.title}</a>
                        <div class="rating">
                            ${getStars(product.rating)}
                            <span>(${product.sold} sold)</span>
                        </div>
                        <div class="card-footer">
                            <span class="price">${formatCurrency(product.price)}</span>
                            <button class="add-to-cart-btn" onclick="addToCart('${product.title}')">
                                <i class="fas fa-shopping-cart"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });

        // Interaction Logic
        const toastEl = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastEl);
        const toastMsg = document.getElementById('toast-message');

        function addToCart(productName) {
            toastMsg.innerText = `${productName} added to cart!`;
            toast.show();
        }

        function toggleWishlist(btn, productName) {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');

            if (btn.classList.contains('active')) {
                icon.classList.remove('far'); // Note: Ensure fas is used in HTML init
                toastMsg.innerText = `${productName} added to wishlist!`;
                toast.show();
            } else {
                toastMsg.innerText = `${productName} removed from wishlist.`;
                toast.show();
            }
        }