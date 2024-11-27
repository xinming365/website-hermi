class Carousel {
    constructor() {
        this.slides = [];
        this.currentIndex = 0;
        this.carousel = document.querySelector('.carousel');
        this.prevArrow = document.querySelector('.prev-arrow');
        this.nextArrow = document.querySelector('.next-arrow');
        this.solutionTitles = document.querySelector('.solutions-titles');
        this.init();
    }

    async init() {
        try {
            const response = await fetch('./data/index-solution.json');
            const data = await response.json();
            this.slides = data.slides;
            this.renderTitles();
            this.renderSlides();
            this.setupEventListeners();
        } catch (error) {
            console.error('加载轮播图数据失败:', error);
        }
    }

    renderTitles() {
        this.solutionTitles.innerHTML = this.slides.map((slide, index) => `
            <div class="solution-title ${index === this.currentIndex ? 'active' : ''}" 
                 data-index="${index}">
                ${slide.title}
            </div>
        `).join('');
    }

    renderSlides() {
        const prevIndex = this.getPrevIndex();
        const nextIndex = this.getNextIndex();

        this.carousel.innerHTML = `
            <a class="solution-card prev" href="${this.slides[prevIndex].url}">
                <img src="${this.slides[prevIndex].image}" alt="${this.slides[prevIndex].title}">
                <div class="solution-info">
                    <h3>${this.slides[prevIndex].title}</h3>
                    <p>${this.slides[prevIndex].description}</p>
                </div>
            </a>
            <a class="solution-card current" href="${this.slides[this.currentIndex].url}">
                <img src="${this.slides[this.currentIndex].image}" alt="${this.slides[this.currentIndex].title}">
                <div class="solution-info"">
                    <h3>${this.slides[this.currentIndex].title}</h3>
                    <p>${this.slides[this.currentIndex].description}</p>
                </div>
            </a>
            <a class="solution-card next" href="${this.slides[nextIndex].url}">
                <img src="${this.slides[nextIndex].image}" alt="${this.slides[nextIndex].title}">
                <div class="solution-info">
                    <h3>${this.slides[nextIndex].title}</h3>
                    <p>${this.slides[nextIndex].description}</p>
                </div>
            </a>
        `;
    }

    getPrevIndex() {
        return (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    }

    getNextIndex() {
        return (this.currentIndex + 1) % this.slides.length;
    }

    setupEventListeners() {
        this.prevArrow.addEventListener('click', () => this.slide('prev'));
        this.nextArrow.addEventListener('click', () => this.slide('next'));

        this.solutionTitles.addEventListener('click', (e) => {
            const titleElement = e.target.closest('.solution-title');
            if (titleElement) {
                const index = parseInt(titleElement.dataset.index);
                this.currentIndex = index;
                this.updateTitles();
                this.renderSlides();
            }
        });
    }

    updateTitles() {
        const titles = this.solutionTitles.querySelectorAll('.solution-title');
        titles.forEach((title, index) => {
            title.classList.toggle('active', index === this.currentIndex);
        });
    }

    slide(direction) {
        if (direction === 'prev') {
            this.currentIndex = this.getPrevIndex();
        } else {
            this.currentIndex = this.getNextIndex();
        }
        this.updateTitles();
        this.renderSlides();
    }
}

// 初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});
