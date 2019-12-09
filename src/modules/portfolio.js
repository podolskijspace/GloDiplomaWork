const portfolio = () => {
    const unShowModal = (selector) => {
        const modal = document.querySelector(selector);
        let opacity;
        if (modal.style.opacity < 1) {
            opacity = modal.style.opacity;
        }
        else {
            opacity = 1;
        }
        const minusOpacity = () => {
            opacity -= 0.05;
            modal.style.opacity = opacity;
            if (opacity > 0) {
                requestAnimationFrame(minusOpacity);
            } 
            else {
                modal.style.visibility = 'hidden';
            }
        };
        minusOpacity();
    };
    const showModal = (selector) => {
        const modal = document.querySelector(selector);
        let opacity;
        if (modal.style.opacity > 0) {
            opacity = modal.style.opacity;
        }
        else {
            opacity = 0;
        }
        modal.style.visibility = 'visible';
        const plusOpacity = () => {
            opacity += 0.05;
            modal.style.opacity = opacity;
            if (opacity < 1) {
                requestAnimationFrame(plusOpacity);
            }
        };
        plusOpacity();
    };
    const wrapper = document.getElementById('portfolio'),
                slidesWrap = wrapper.querySelector('.portfolio-slider'),
                slidesCouple = wrapper.querySelectorAll('.portfolio-slider__slide'),
                slides = wrapper.querySelectorAll('.portfolio-slider__slide-frame'),
                popup = document.querySelector('.popup-portfolio'),
                popupSlidesWrapper = popup.querySelector('.popup-portfolio-slider'),
                popupSlides = popupSlidesWrapper.querySelectorAll('.popup-portfolio-slider__slide'),
                popupSliderCountCurrent = popup.querySelector('.slider-counter-content__current'),
                popupTextBlocks = popup.querySelectorAll('.popup-portfolio-text'),
                prev = document.querySelector('#portfolio-arrow_left'),
                next = document.querySelector('#portfolio-arrow_right'),
                right = document.getElementById('popup_portfolio_right'),
                left = document.getElementById('popup_portfolio_left');
    wrapper.addEventListener('click', event => {
        const target = event.target;

        let num;
        if (document.documentElement.clientWidth > 1024) {
            if (target.matches('.portfolio-slider__slide-frame')) {
                slides.forEach((item, i) => {
                    if  (item === target) {
                        num = i - 10;
                    }
                })
                showModal('.popup-portfolio');
                popupTextBlocks.forEach(item => item.style.display = '');
                popupTextBlocks[num].style.display = 'block';
                popupSliderCountCurrent.textContent = num + 1;
            }
        }
    })

    popup.querySelector('.close').addEventListener('click', () => unShowModal('.popup-portfolio'));
    const moveSlider = () => {
    
        left.addEventListener('click', event => {
            let num = +popupSliderCountCurrent.textContent;
            popupTextBlocks[num - 1].style.display = '';
            if (num === 1) {
                num = 10;
            } else {
                num--;
            }
            popupSlidesWrapper.insertAdjacentElement('afterbegin', popupSlides[num - 1]);
            popupSliderCountCurrent.textContent = num;
            popupTextBlocks[num - 1].style.display = 'block';
        });

        right.addEventListener('click', event => {
            let num = +popupSliderCountCurrent.textContent;
            popupTextBlocks[num - 1].style.display = '';
            if (num === 10) {
                num = 1;
            } else {
                num++;
            }
            popupSlidesWrapper.insertAdjacentElement('afterbegin', popupSlides[num - 1]);
            popupSliderCountCurrent.textContent = num;
            popupTextBlocks[num - 1].style.display = 'block';
        });
    };

    moveSlider ();

    const sliderCarouselSpecial = () => {
        const   widthSlide = +slidesCouple[0].clientWidth;
        let position = 0,
            maxPosition = 2,
            plus = 2,
            minus = -1;
            if (document.documentElement.clientWidth <= 1024) {
                maxPosition = 3;
                slidesCouple[2].style.opacity = 0;
                plus = 1;
                minus = 1;
            } 
            if  (document.documentElement.clientWidth <= 900) {
                maxPosition = 4;
                slidesCouple[1].style.opacity = 0;
                plus = 0;
                minus = 3;
            }
        prev.addEventListener('click', () => prevSlider());
        next.addEventListener('click', () => nextSlider());

        const prevSlider = ()  => {
            if (document.documentElement.clientWidth >= 576) {
                if (position > 0) {
                    next.style.display = 'flex';
                    next.style.opacity = '1';
                    position--;
                    slidesWrap.style.transform = `translateX(-${+position * +widthSlide}px)`;
                    console.log(position + maxPosition - minus);
                    slidesCouple[position + maxPosition - minus].style.opacity = '0';
                    slidesCouple[position].style.opacity = '1';
                    if (position === 0) {
                        prev.style.display = 'none';
                    }
                }
            }
        };

        const nextSlider = ()  => {
            if (document.documentElement.clientWidth >= 576) {
                if  (position < maxPosition){
                    prev.style.display = 'flex';
                    position++;
                    slidesWrap.style.transform = `translateX(-${+position * +widthSlide}px)`;
                    slidesCouple[plus + position].style.opacity = '1';
                    slidesCouple[position - 1].style.opacity = '0';
                    if (position === maxPosition) {
                        next.style.display = 'none';
                    }
                }
            }
        };
    }; 
    sliderCarouselSpecial();

    const sliderMobile = (slideSelector, sliderSelector, leftSelector, rightSelector, counterSelector) => {
    const   slide = document.querySelectorAll(slideSelector),
                slider = document.querySelector(sliderSelector),
                left = document.querySelector(leftSelector),
                right = document.querySelector(rightSelector),
                counter = document.querySelectorAll(counterSelector)[1];
    let currentSlide = 0;

    left.addEventListener('click', event => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slide.length - 1 - 10;
        }
        slider.insertAdjacentElement('afterbegin', slide[currentSlide]);
        counter.textContent = currentSlide + 1;

    });

    right.addEventListener('click', event => {
        currentSlide++;
        if (currentSlide >= slide.length - 10) {
            currentSlide = 0;
        }
        slider.insertAdjacentElement('afterbegin', slide[currentSlide]);
        counter.textContent = currentSlide + 1;
    });
}

sliderMobile('.portfolio-slider__slide-frame', '.portfolio-slider-mobile', '#portfolio-arrow-mobile_left', '#portfolio-arrow-mobile_right', '.slider-counter-content__current')

}

export default portfolio;