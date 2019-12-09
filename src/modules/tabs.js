const tabs = () => {
    const   tabWrapper = document.querySelector('#scheme'),
                buttonList = tabWrapper.querySelector('.nav-list'),
                buttonsNav = buttonList.children,
                tabsText = tabWrapper.querySelectorAll('.scheme-description-block'),
                tabsImg = tabWrapper.querySelectorAll('.scheme-slider__slide'),
                imgWrapper = tabWrapper.querySelector('.scheme-slider');

    let old = 0;
    buttonList.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.scheme-nav__item')) {
            buttonsNav[old].classList.remove('active');
            tabsText[old].classList.remove('visible-content-block');
            
            old = target.dataset.number;
            imgWrapper.insertAdjacentElement('afterbegin', tabsImg[old]);
            buttonsNav[old].classList.add('active');
            tabsText[old].classList.add('visible-content-block');

            
        }
    });

};

export default tabs;