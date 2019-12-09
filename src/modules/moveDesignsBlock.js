const moveDesignsBlock = () => {
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
    const   wrapper = document.getElementById('designs'),
                tabsNav = document.querySelector('.nav-list-designs'),
                tabsElems = tabsNav.querySelectorAll('.designs-nav__item'),
                previewBlock = wrapper.querySelectorAll('.preview-block'),
                sliderWrapper = wrapper.querySelector('.designs-slider'),
                sliders = [...sliderWrapper.children],
                countCurrent = wrapper.querySelector('.slider-counter-content__current'),
                countTotal = wrapper.querySelector('.slider-counter-content__total'),
                link = wrapper.querySelector('.link-list-designs'),
                popup = document.querySelector('.popup-design'),
                popupNavWrapper = popup.querySelector('.nav-list'),
                popupSliderWrapper = popup.querySelector('.popup-design-slider'),
                popupSliderSlides = [...popupSliderWrapper.children],
                countTotalPopup = popup.querySelector('.slider-counter-content__total'),
                countCurrentPopup = popup.querySelector('.slider-counter-content__current'),
                textBlock = popup.querySelectorAll('.popup-design-text');
    let num = 1,
        totalNum = 3;
    
    link.addEventListener('click', () => showModal('.popup-design')); 
    popup.querySelector('.close').addEventListener('click', () => unShowModal('.popup-design'));

    const tabs = () => {
        tabsNav.addEventListener('click', event => {
            const target = event.target;

            num = +target.dataset.number;
            if (target.matches('.designs-nav__item')) {
                tabsElems.forEach((item, i) => {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                        previewBlock[i].classList.remove('visible');
                    }
                });
                target.classList.add('active');
                previewBlock[num].classList.add('visible');
                sliderWrapper.insertAdjacentElement('afterbegin', sliders[num]);
                countTotal.textContent = previewBlock[num].childElementCount;
                totalNum = +(wrapper.querySelector('.designs-slider').children[0].children[0].dataset.number) + 1;
                countCurrent.textContent = totalNum;
            }
        });
    };
    tabs();
    const tabsPopup = () => {
        popupNavWrapper.addEventListener('click', event => {
            const target = event.target;
            
            if (target.matches('.button_o')) {
                for (let i = 0; i < 5; i++) {
                    if (target === popupNavWrapper.children[i]) {
                        num = i;
                    }
                    if (popupNavWrapper.children[i].classList.contains('active')) {
                        popupNavWrapper.children[i].classList.remove('active');
                    }
                }
                
                tabsElems.forEach((item, i) => {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                        popupNavWrapper.children[i].classList.remove('active');
                        
                    }
                });
                textBlock.forEach(item => {
                    if (item.classList.contains('visible-content-block')) {
                        item.classList.remove('visible-content-block');
                        console.log(item);
                    }
                })
                target.classList.add('active');
                console.log(textBlock, num);
                textBlock[num].classList.add('visible-content-block');
                popupSliderWrapper.insertAdjacentElement('afterbegin', popupSliderSlides[num]);
                countTotalPopup.textContent = popupSliderSlides[num].childElementCount;
                countCurrentPopup.textContent = +popupSliderSlides[num].children[0].dataset.number + 1;
            }
        })
    }
    tabsPopup();
    const moveSliders = (countCurrent, left, right, sliderWrapper) => {
        let     slider,
                wrapSlider;
        let currentSlide = 0;

        const findCurrentSlide = ()  => {
            currentSlide =  +slider[0].dataset.number;
        };
        
        const prevSlide = (elem, index) => {
            elem.forEach(item => {
                if (+item.dataset.number === index) {
                    wrapSlider.insertAdjacentElement('afterbegin', item);
                    changeCounter(+item.dataset.number + 1);
                }
            });
        };
        
        const nextSlide = (elem, index) => {
            elem.forEach(item => {
                if (+item.dataset.number === index) {
                    wrapSlider.insertAdjacentElement('afterbegin', item);
                    changeCounter(+item.dataset.number + 1);
                }
            });
        };

        const changeCounter = (index) => {
            countCurrent.textContent = index;
        };

        left.addEventListener('click', event => {
            wrapSlider = sliderWrapper.children[0];
            slider = [...sliderWrapper.children[0].children];
            findCurrentSlide();
            prevSlide(slider, currentSlide);
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slider.length - 1;
            }
            nextSlide(slider, currentSlide);
        });

        right.addEventListener('click', event => {
            wrapSlider = sliderWrapper.children[0];
            slider = [...sliderWrapper.children[0].children];
            findCurrentSlide();
            prevSlide(slider, currentSlide);
            currentSlide++;
            if (currentSlide >= slider.length) {
                currentSlide = 0;
            }
            nextSlide(slider, currentSlide);
        });
    };
    moveSliders(countCurrent, document.querySelector('#design_left'), document.querySelector('#design_right'), sliderWrapper);
    moveSliders(countCurrentPopup, document.querySelector('#popup_design_left'), document.querySelector('#popup_design_right'), popupSliderWrapper);
    wrapper.addEventListener('click', event => {
        const target = event.target;
        let num = 0,
            parentNum;
        
        if (target.matches('.preview-block__item-inner')) {
            let     parent = target.parentNode.parentNode,
                    children = parent.querySelectorAll('.preview-block__item'),
                    parentSlider = wrapper.querySelector('.designs-slider'),
                    childSlider = parentSlider.children[0],
                    slider = [...childSlider.children];
            parentNum = +parent.dataset.number;
            num = +target.parentNode.dataset.number;
            slider.forEach(item => {
                if (num === +item.dataset.number) {
                    childSlider.insertAdjacentElement('afterbegin', item);
                }
            });
            children.forEach(item => {
                let elem = item.querySelector('.preview-block__item-inner');
                if (elem.classList.contains('preview_active')){
                    elem.classList.remove('preview_active');
                }
            });
            target.classList.add('preview_active');
            countCurrent.textContent = num + 1;
            
        }
    });
};

export default moveDesignsBlock;