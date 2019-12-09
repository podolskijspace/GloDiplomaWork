const sliderCarouselSpecial = (prevSelector, nextSelector, wrapSelector, slidesSelector) => {
    const   prev = document.querySelector(prevSelector),
                next = document.querySelector(nextSelector),
                wrap = document.querySelector(wrapSelector),
                slides = wrap.querySelectorAll(slidesSelector),
                widthSlide = slides[0].clientWidth + (slides[0].offsetLeft * 2);
    let position = -1;
    prev.addEventListener('click', () => prevSlider());
    next.addEventListener('click', () => nextSlider());

    const prevSlider = ()  => {
        if (position > -1) {
            --position;
            makeOpacity();
            let pos = -(widthSlide * position);
            wrap.style.transform = `translateX(${pos}px)`;
        }
    };

    const nextSlider = ()  => {
        if  (position < slides.length - 2){
            ++position;
            makeOpacity();
            let pos = -(widthSlide * position);
            wrap.style.transform = `translateX(${pos}px)`;
        }
    };

    const makeOpacity1 = (elem) => {
        elem.style.opacity = 1;
    };
    const makeOpacity5 = (elem) => {
        elem.style.opacity = 0.5;
    };
    const makeOpacity0 = (elem) => {
        elem.style.opacity = 0;
    };
    const makeOpacity = () => {
        if (document.documentElement.clientWidth > 764) {
            if (slides[position]) {
                makeOpacity5(slides[position]);
            }
            if (slides[position + 2]) {
                makeOpacity5(slides[position + 2]);
            }
        }
        else {
            if (slides[position]) {
                makeOpacity0(slides[position]);
            }
            if (slides[position + 2]) {
                makeOpacity0(slides[position + 2]);
            }
        }
        if (slides[position + 1]) {
            makeOpacity1(slides[position + 1]);
        }
        if (slides[position - 1]) {
            makeOpacity0(slides[position-1]);
        }
    };
    if (document.documentElement.clientWidth <= 764) {
        makeOpacity0(slides[1]);
    }
}; 

export default sliderCarouselSpecial;