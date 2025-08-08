// Home page specific JavaScript for PrintCraft Tees
// Handles featured products carousel and home page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Featured products carousel functionality
    const carousel = document.querySelector('.featured__carousel');
    if (carousel) {
        const track = carousel.querySelector('.featured__track');
        const prevBtn = carousel.querySelector('.featured__nav--prev');
        const nextBtn = carousel.querySelector('.featured__nav--next');
        const products = carousel.querySelectorAll('.product-card');
        
        let currentIndex = 0;
        const maxIndex = products.length - 1;
        const cardWidth = 300; // Approximate card width including margin
        const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
        
        // Initialize carousel
        function initCarousel() {
            if (products.length <= visibleCards) {
                // Hide navigation if all products are visible
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                return;
            }
            
            updateCarousel();
        }
        
        // Update carousel position
        function updateCarousel() {
            const translateX = -currentIndex * cardWidth;
            track.style.transform = `translateX(${translateX}px)`;
            
            // Update navigation button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex - visibleCards + 1;
            
            // Update ARIA labels
            prevBtn.setAttribute('aria-label', currentIndex === 0 ? 'No previous products' : 'Previous products');
            nextBtn.setAttribute('aria-label', currentIndex >= maxIndex - visibleCards + 1 ? 'No more products' : 'Next products');
        }
        
        // Navigation event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (currentIndex < maxIndex - visibleCards + 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }
        
        // Keyboard navigation
        carousel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentIndex < maxIndex - visibleCards + 1) {
                    currentIndex++;
                    updateCarousel();
                }
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        carousel.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            const translateX = -currentIndex * cardWidth - diff;
            track.style.transform = `translateX(${translateX}px)`;
        });
        
        carousel.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            const threshold = cardWidth / 3;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentIndex < maxIndex - visibleCards + 1) {
                    // Swipe left - next
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right - previous
                    currentIndex--;
                }
            }
            
            updateCarousel();
        });
        
        // Initialize on load
        initCarousel();
        
        // Reinitialize on window resize
        window.addEventListener('resize', function() {
            setTimeout(initCarousel, 100);
        });
    }
    
    // Hero section animations
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroTitle = hero.querySelector('.hero__title');
        const heroSubtitle = hero.querySelector('.hero__subtitle');
        const heroActions = hero.querySelector('.hero__actions');
        
        // Staggered animation for hero elements
        setTimeout(() => {
            if (heroTitle) heroTitle.classList.add('hero__title--animate');
        }, 300);
        
        setTimeout(() => {
            if (heroSubtitle) heroSubtitle.classList.add('hero__subtitle--animate');
        }, 600);
        
        setTimeout(() => {
            if (heroActions) heroActions.classList.add('hero__actions--animate');
        }, 900);
    }
    
    // Category cards hover effects with enhanced animations
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        // Staggered entrance animation
        setTimeout(() => {
            card.classList.add('category-card--entered');
        }, 200 * index);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('category-card--hover');
            const image = this.querySelector('.category-card__img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('category-card--hover');
            const image = this.querySelector('.category-card__img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Product cards enhanced interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        // Staggered entrance animation
        setTimeout(() => {
            card.classList.add('product-card--entered');
        }, 100 * index);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('product-card--hover');
            const image = this.querySelector('.product-card__img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('product-card--hover');
            const image = this.querySelector('.product-card__img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
        
        // Click to view details
        const viewBtn = card.querySelector('.product-card__btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const productTitle = card.querySelector('.product-card__title').textContent;
                const productPrice = card.querySelector('.product-card__price').textContent;
                
                // Show product details modal or navigate to product page
                showProductModal(productTitle, productPrice);
            });
        }
    });
    
    // Product modal functionality
    function showProductModal(title, price) {
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.innerHTML = `
            <div class="product-modal__overlay"></div>
            <div class="product-modal__content">
                <button class="product-modal__close" aria-label="Close modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="product-modal__body">
                    <h2 class="product-modal__title">${title}</h2>
                    <div class="product-modal__price">${price}</div>
                    <p class="product-modal__description">Premium quality custom printed apparel with your unique design.</p>
                    <div class="product-modal__actions">
                        <button class="btn btn--primary product-modal__btn">Add to Cart</button>
                        <button class="btn btn--secondary product-modal__btn">Customize Design</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.product-modal__close');
        const overlay = modal.querySelector('.product-modal__overlay');
        
        function closeModal() {
            modal.classList.add('product-modal--closing');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        
        // Focus trap for accessibility
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
        
        // Focus first element
        setTimeout(() => {
            firstElement.focus();
        }, 100);
    }
    
    // Bulk CTA section enhanced interactions
    const bulkCta = document.querySelector('.bulk-cta');
    if (bulkCta) {
        const ctaBtn = bulkCta.querySelector('.btn');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', function(e) {
                // Add click animation
                this.classList.add('btn--clicked');
                setTimeout(() => {
                    this.classList.remove('btn--clicked');
                }, 200);
            });
        }
    }
    
    // Parallax effect for hero section
    const heroImage = document.querySelector('.hero__img');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Auto-play carousel (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        if (carousel && !autoPlayInterval) {
            autoPlayInterval = setInterval(() => {
                const nextBtn = carousel.querySelector('.featured__nav--next');
                if (nextBtn && !nextBtn.disabled) {
                    nextBtn.click();
                } else {
                    // Reset to first slide
                    currentIndex = 0;
                    updateCarousel();
                }
            }, 5000); // Change slide every 5 seconds
        }
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Start auto-play when page loads
    setTimeout(startAutoPlay, 3000);
    
    // Pause auto-play on user interaction
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        carousel.addEventListener('focusin', stopAutoPlay);
        carousel.addEventListener('focusout', startAutoPlay);
    }
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update any scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
});
