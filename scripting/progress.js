class ImageSlider {
    constructor(container, images) {
        this.container = container;
        this.images = images;
        this.currentIndex = 0;
        this.sliderTrack = null;
        this.slideIndicators = null;
        this.slideCounter = null;
        
        this.init();
    }

    init() {
        // Create slider structure
        const sliderHTML = `
            <div class="slider-container">
                <div class="slider-track"></div>
                <button class="arrow arrow-left" aria-label="Previous image"></button>
                <button class="arrow arrow-right" aria-label="Next image"></button>
                <div class="slide-indicators"></div>
                <div class="slide-counter">1 / ${this.images.length}</div>
            </div>
        `;
        
        this.container.querySelector('.projectContent').innerHTML = sliderHTML;
        
        // Get references to elements
        this.sliderTrack = this.container.querySelector('.slider-track');
        this.slideIndicators = this.container.querySelector('.slide-indicators');
        this.slideCounter = this.container.querySelector('.slide-counter');
        this.arrowLeft = this.container.querySelector('.arrow-left');
        this.arrowRight = this.container.querySelector('.arrow-right');
        
        // Create slides
        this.images.forEach((image, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'slide';
            
            // Use either img tag or background image
            slide.innerHTML = `
                <img src="${image}" alt="Slide ${index + 1}" loading="lazy">
                <div class="slide-overlay"></div>
            `;
            
            this.sliderTrack.appendChild(slide);

            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            this.slideIndicators.appendChild(indicator);
        });

        this.setupEventListeners();
        this.updateSlider();
    }

    setupEventListeners() {
        this.arrowLeft.addEventListener('click', () => this.prevSlide());
        this.arrowRight.addEventListener('click', () => this.nextSlide());

        this.slideIndicators.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            else if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Touch support
        let touchStartX = 0;
        this.sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.sliderTrack.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.nextSlide();
                else this.prevSlide();
            }
        });
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateSlider();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }

    updateSlider() {
        this.sliderTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        this.slideCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }
}

// Initialize sliders on page load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.projectContainer[data-slider-images]').forEach(container => {
        const images = JSON.parse(container.getAttribute('data-slider-images'));
        new ImageSlider(container, images);
    });
});