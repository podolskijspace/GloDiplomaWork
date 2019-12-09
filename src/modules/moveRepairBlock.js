const moveRepairBlock = () => {
    const   wrapper = document.getElementById('repair-types'),
                tabsWrapper = wrapper.querySelector('.repair-types-tab'),
                tabsElems = tabsWrapper.querySelectorAll('.repair-types-nav__item'),
                sliderWrapper = wrapper.querySelector('.repair-types-slider'),
                countCurrent = wrapper.querySelector('.slider-counter-content__current'),
                countAll = wrapper.querySelector('.slider-counter-content__total'),
                tabsNav = tabsWrapper.querySelector('.nav-list-repair');
    let sliders = [];
    for (let i = 0; i <=  4; i++) {
        sliders[i] = wrapper.querySelector(`.types-repair${i+1}`);
    }

    const tabs = () => {
        tabsWrapper.addEventListener('click', event => {
            const target = event.target;

            if (target.matches('.repair-types-nav__item')){
                let num = target.dataset.number - 1;
                tabsElems.forEach(item => item.classList.remove('active'));
                tabsElems[num].classList.add('active');
                sliderWrapper.insertAdjacentElement('afterbegin', sliders[num]);
                countAll.textContent = sliderWrapper.firstChild.children.length;
                countCurrent.textContent = +sliderWrapper.children[0].children[0].dataset.number + 1;
            }
        });
    };
    tabs();
    const moveSliders = () => {
        const    left = document.querySelector('#repair-types-arrow_left'),
                    right = document.querySelector('#repair-types-arrow_right');
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
    moveSliders();

    if (document.documentElement.clientWidth <= 1024) {
        getResponseTabs(document.getElementById('repair-types').querySelector('.nav-list-repair'), '#nav-arrow-repair-left_base', '#nav-arrow-repair-right_base');
    }
};

export default moveRepairBlock;