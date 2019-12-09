import getResponseTabs from './modules/getResponseTabs';
import slider from './modules/slider';
import sliderCarousel from './modules/sliderCarousel';
import sliderCarouselSpecial from './modules/sliderCarouselSpecial';
import showModal from './modules/showModal';
import unShowModal from './modules/unShowModal';
import accordion from './modules/accordion';
import accordionNumber from './modules/accordionNumber';/
import helpPopup from './modules/helpPopup';
import makeForm from './modules/makeForm';
import maskPhone from './modules/maskPhone';
import menu from './modules/menu';
import moveDesignsBlock from './modules/moveDesignsBlock';
import moveRepairBlock from './modules/moveRepairBlock';
import portfolio from './modules/portfolio';
import problemPopup from './modules/problemPopup';

import tabs from './modules/tabs';

slider('.popup-transparency-slider__slide', '.popup-transparency-slider-wrap', '#transparency_left', 
    '#transparency_right');
if (window.outerWidth <= 1090) {
    slider('.transparency-item', '.transparency-slider-wrap', '#transparency-arrow_left', 
    '#transparency-arrow_right');
}
if (document.documentElement.clientWidth <= 1024) {
    getResponseTabs(document.getElementById('repair-types').querySelector('.nav-list-repair'), '#nav-arrow-repair-left_base', '#nav-arrow-repair-right_base');
}
getResponseTabs(document.querySelector('.nav-list-designs'), '#nav-arrow-designs_left', '#nav-arrow-designs_right');
//accordion number
accordionNumber();
//MENU
menu();
//Аккордеон внизу
accordion();
//Подсказки
helpPopup();
//Кнопки проконсультироваться
const   btnsConsult = document.querySelectorAll('.button_wide'),
                cunsultPopup = document.querySelector('.popup-consultation');
    btnsConsult.forEach(item => item.addEventListener('click', () => showModal('.popup-consultation')));
    cunsultPopup.querySelector('.close').addEventListener('click', () => unShowModal('.popup-consultation'));

//Политика конфедициальности
const   btnsPolitic = document.querySelectorAll('.link-privacy'),
                politicPopup = document.querySelector('.popup-privacy');
    btnsPolitic.forEach(item => item.addEventListener('click', () => showModal('.popup-privacy')));
    politicPopup.querySelector('.close').addEventListener('click', () => unShowModal('.popup-privacy'));
//ТАБЫ
tabs();
//ФОРМА
for (let i = 1; i <= 6; i++) {
    makeForm(`#feedback${i}`);
}
//Документы
const   transparencyWrapper = document.querySelector('.transparency-slider-wrap'),
                transparencyPopup = document.querySelector('.popup-transparency'),
                slides = transparencyPopup.querySelectorAll('.popup-transparency-slider__slide');
    
    transparencyWrapper.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.transparency-item__img')) {
            showModal('.popup-transparency');
            slides[+target.dataset.number].classList.add('podolskij-active');
        }
        
    });
    transparencyPopup.querySelector('.close').addEventListener('click', event => {
        unShowModal('.popup-transparency');
        slides.forEach(item => item.classList.remove('podolskij-active'));
    });
//Маска телефона
for (let i = 1; i <= 6; i++) {
    maskPhone(`#feedback-input${i}`);
}
//Подсказки в блоке с проблемами
problemPopup();
//Слайдер карусель
const partnersSlider = new sliderCarousel({
    main: '.partners__wrapper',
    wrap: '.partners-slider',
    prev: '#partners-arrow_left',
    next: '#partners-arrow_right',
    slidesToShow: 3,
    responsive: [
    {
        breakpoint: 768,
        slideToShow: 2
    },
    {
        breakpoint: 576,
        slideToShow: 1
    }
    ]
});
partnersSlider.init();
//Слайдер с отзывами
slider('.reviews-slider__slide', '.reviews-slider', '#reviews-arrow_left', '#reviews-arrow_right');
//Адаптивность переключателей 
getResponseTabs(document.getElementById('scheme-list'), '#nav-arrow-scheme_left', '#nav-arrow-scheme_right');
//Блок виды ремонда. Слайдер и табы
moveRepairBlock();
//Добавляем слайдер на подсказки и проблемы
sliderCarouselSpecial('#formula-arrow_left', '#formula-arrow_right', '.formula-slider ', '.formula-slider__slide');
//Блок с плагинацией и прочей лабудой)
moveDesignsBlock();
//блок с портфолио 
portfolio();