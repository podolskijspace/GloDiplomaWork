document.addEventListener('DOMContentLoaded', () => {
    //accordion number
    const accordionNumber = () => {
        const   headerContactsArrow = document.querySelector('.header-contacts__arrow'),
                    headerContactsPhoneNumberAccord = document.querySelector('.header-contacts__phone-number-accord');

        headerContactsArrow.addEventListener('click', function (event) {
            let rotateZ = this.style.transform;

            const rotateArrow = () => {
                if (rotateZ) {
                    rotateZ ='';
                }
                else {
                    rotateZ = `rotateX(180deg)`;
                }
                this.style.transform = rotateZ;
            };
            rotateArrow();

            const makeHeight = () => {
                if (!rotateZ) {
                    headerContactsPhoneNumberAccord.style.top = '0';
                }
                else {
                    headerContactsPhoneNumberAccord.style.top = '25px';
                }
            };
            makeHeight();
            

            const makeVisibility = () => {
                if (!rotateZ) {
                    headerContactsPhoneNumberAccord.querySelector('a').style.opacity = '0';
                }
                else {
                    headerContactsPhoneNumberAccord.querySelector('a').style.opacity = '1';
                }
            };
            makeVisibility();


        });
    };
    accordionNumber();

    //Плавное появление модального окна
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
    //Плавное изчезновение модального окна
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

    //MENU

    const menu = () => {
        const   popupDialogMenu = document.querySelector('.popup-dialog-menu'),
                    menuBtn = document.querySelector('.menu__icon'),
                    buttonFooter = document.querySelector('.button-footer'),
                    popupMenu = document.querySelector('.popup-menu'),
                    repairModal = document.querySelector('.popup-repair-types');

        menuBtn.addEventListener('click', event => {
            popupDialogMenu.style.transform = 'translate3d(0, 0, 0)';
        });

        //плавная прокрутка вверх
        const goOnTop = () => {
            window.scrollBy(0, -100);
            if (window.scrollY > 0) {
                requestAnimationFrame(goOnTop);
            }
        };
        buttonFooter.addEventListener('click', () => {
            let transform = checkTransform();
            goOnTop();
            popupDialogMenu.style.transform = transform;
        });

        //События по кнопкам меню
        popupMenu.addEventListener('click', event => {
            let     transform = checkTransform(),
                    target = event.target;
            if (target.closest('.close-menu')) {
                popupDialogMenu.style.transform = transform;
            }
            if(target.matches('.move-link')) {
                event.preventDefault();
                let    coordY = document.querySelector(target.getAttribute('href')).getBoundingClientRect().top + 
                window.pageYOffset,
                        moveNumber = 50;

                const moveWindowUp = () => {
                    window.scrollBy(0, moveNumber);
                    if ((window.scrollY - coordY) > 100) {
                        requestAnimationFrame(moveWindowUp);
                    }
                    else {
                        window.scrollBy(0, -(window.scrollY - coordY));
                    }
                },

                moveWindowDown = () => {
                    window.scrollBy(0, moveNumber);
                    if (( coordY - window.scrollY) > 100) {
                        requestAnimationFrame(moveWindowDown);
                    }
                    else {
                        window.scrollBy(0, coordY - window.scrollY);
                    }
                };
                if (coordY >= window.scrollY) {
                    moveWindowDown();
                    
                }
                else {
                    moveNumber =  -moveNumber;
                    moveWindowUp();
                }
                popupDialogMenu.style.transform = transform;
            }
            if  (target.closest('.show-repair')){
                showModal('.popup-repair-types');
                popupDialogMenu.style.transform = transform;
            }
        });
        const anothBlockBtnShowModal = document.querySelector('.show-repair-modal');
        anothBlockBtnShowModal.addEventListener('click', () =>{
            let transform = checkTransform();
            showModal('.popup-repair-types');
            popupDialogMenu.style.transform = transform;
        });
        const checkTransform = () => {
            if (window.innerWidth < 576) {
                return 'translate3d(0, -100vh, 0)';
            }
            else {
                return 'translate3d(645px, 0, 0)';
            }
        };
        repairModal.querySelector('.close').addEventListener('click', () => unShowModal('.popup-repair-types'));
    };
    menu();
    //Аккордеон внизу
    const accordion = () => {
        const   accordion = document.querySelector('.accordion'),
                    items = document.querySelectorAll('h2');
        let old = 0;
        accordion.addEventListener('click', event => {
            let target = event.target;
            if (target.matches('.title_block')) {
                items[old].classList.remove('msg-active');
                old = target.dataset.number;
                items[old].classList.add('msg-active');
            }
        });
    };
    accordion();
    //Подсказки
    const helpPopup = () => {
        const blockWatched = document.getElementById('formula');
        let     num,
                _this,
                _thisBefore,
                items,
                mainTop = blockWatched.getBoundingClientRect().top;
        blockWatched.addEventListener('mouseover', event => {
            const target = event.target;
            if (target.closest('.formula-item__icon-inner-text')){
                num = +target.textContent;
                let selector = `.formula-item-popup-0${num}`;
                _this = document.querySelectorAll(selector)[0];
                _thisBefore = document.querySelector(`${selector}-before`);
                items = document.querySelectorAll('.formula-item');
                // if ((mainTop - window.scrollY) < 350) {
                    // console.log('УРА');
                    // _thisBefore.style.transform = "rotate(180deg)";
                    // _thisBefore.style.top = "-10px";
                    // _this.style.top = "110px";
                // }
                
                showModal(selector);
                
            }
        });
        blockWatched.addEventListener('mouseout', event => {
            const target = event.target;
            if (target.closest('.formula-item__icon-inner-text')){
                num = +target.textContent;
                let selector = `.formula-item-popup-0${num}`;
                _this = document.querySelector(selector);
                unShowModal(selector);
                
            }
        });
            // .formula-item-popup-01:before
        // transform: rotate(180deg);
        //top: -10px
        // .formula-item-popup-01
        //top 110px
    };
    helpPopup();
    //Кнопки проконсультироваться
    const consult = () => {
        const   btnsConsult = document.querySelectorAll('.button_wide'),
                    cunsultPopup = document.querySelector('.popup-consultation');
        btnsConsult.forEach(item => item.addEventListener('click', () => showModal('.popup-consultation')));
        cunsultPopup.querySelector('.close').addEventListener('click', () => unShowModal('.popup-consultation'));
    };
    consult();
    //Политика конфедициальности
    const politicPopup = () => {
        const   btnsPolitic = document.querySelectorAll('.link-privacy'),
                    politicPopup = document.querySelector('.popup-privacy');
        btnsPolitic.forEach(item => item.addEventListener('click', () => showModal('.popup-privacy')));
        politicPopup.querySelector('.close').addEventListener('click', () => unShowModal('.popup-privacy'));
    };
    politicPopup();
    //ТАБЫ
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
    tabs();
});  