class sliderCarousel {
    constructor ({
    main, 
    wrap, 
    next,
    prev,
    position = 0,
    slidesToShow = 5,
    responsive = []
    }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.slides = this.wrap.children;
    this.options = {
        position,
        widthSlide : Math.floor(100 / this.slidesToShow),
    };
    this.responsive = responsive;
    }

    init() {
    this.addPodolskijClass();
    this.addStyle();
    if (this.prev && this.next) {
        this.controlSlider();
    }
    else {
        this.addArrow();
        this.controlSlider();
    }
    if (this.responsive) {
        this.responseInit();
    }
    
    }

    addPodolskijClass () {
    this.main.classList.add('podolskij-slider');
    this.wrap.classList.add('podolskij-slider__wrap');
    
    for (let item of this.slides) {
        item.classList.add('podolskij-slider__item');
    }
    }

    addStyle () {
    let style = document.getElementById('sliderCarousel-style');
    if (!style){
        style = document.createElement('style');
        style.id = 'sliderCarousel-style';
    }
    
    style.textContent = `
        .podolskij-slider {
        overflow: hidden !important;
        }
        .podolskij-slider__wrap{
        display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;
        }
        .podolskij-slider__item{
        flex: 0 0 ${this.options.widthSlide}% !important;
        margin: auto 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-around !important;
        }
    `;
    document.head.appendChild(style);
    }

    controlSlider () {
    this.prev.addEventListener('click', () => this.prevSlider());
    this.next.addEventListener('click', () => this.nextSlider());
    }

    prevSlider () {
    if (this.options.position > 0) {
        --this.options.position;
        this.wrap.style.transform = `translateX(-${this.options.widthSlide * this.options.position}%)`;
    }
    }

    nextSlider () {
    if  (this.options.position < this.slides.length - this.slidesToShow){
        ++this.options.position;
        this.wrap.style.transform = `translateX(-${this.options.widthSlide * this.options.position}%)`;
    }
    }

    addArrow () {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'podolskij-slider__prev';
    this.next.className = 'podolskij-slider__next';

    this.main.appendChild(this.prev);
    this.main.appendChild(this.next);

    const style = document.getElementById('sliderCarousel-style');
    style.textContent += `
        .podolskij-slider__prev,
        .podolskij-slider__next{
        margin: 0 10px;
        border: 20px solid transparent;
        background: transparent;
        }
        .podolskij-slider__next {
        border-left-color: #19b5fe;
        }
        .podolskij-slider__prev {
        border-right-color: #19b5fe;
        }
    `;
    }

    responseInit () {
    const slidesToShowDefault = this.slidesToShow,
                allResponse = this.responsive.map(item => item.breakpoint),
                allSlidesToShow = this.responsive.map(item => item.slideToShow);
    
    const checkResponse = () => {
    const widthWindow = document.documentElement.clientWidth;
    let count = 0;
    allResponse.forEach ((item, i) => {
        if (widthWindow < item) {
        count++;
        this.slidesToShow = allSlidesToShow[i];
        }
    });
    if (count === 0) {
        this.slidesToShow = slidesToShowDefault;
    }
    this.options.widthSlide = Math.floor(100 / this.slidesToShow);
    this.addStyle();
    
    };

    checkResponse();
    window.addEventListener('resize', checkResponse);
    }


}

export default sliderCarousel;