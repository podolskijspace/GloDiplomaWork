const slider = (slideSelector, sliderSelector, leftSelector, rightSelector) => {
    const   slide = document.querySelectorAll(slideSelector),
                slider = document.querySelector(sliderSelector),
                left = document.querySelector(leftSelector),
                right = document.querySelector(rightSelector);
    let currentSlide = 0;

    const findCurrentSlide = ()  => {
        slide.forEach((item, i) => {
            if (item.classList.contains('podolskij-active')) { 
                currentSlide =  i;
            }
        });
    };
    
    const prevSlide = (elem, index) => {
        elem[index].classList.remove('podolskij-active');
    };
    
    const nextSlide = (elem, index) => {
        elem[index].classList.add('podolskij-active');
    };

    left.addEventListener('click', event => {
        findCurrentSlide();
        prevSlide(slide, currentSlide);
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide);
    });

    right.addEventListener('click', event => {
        findCurrentSlide();
        prevSlide(slide, currentSlide);
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide);
    });

};

export default slider;