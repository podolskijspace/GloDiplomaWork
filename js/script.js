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
        let opacity = 0;
        modal.style.display = 'block';
        modal.style.visibility = 'visible';
        const plusOpacity = () => {
            opacity += 0.05;
            modal.style.opacity = opacity;
            if (opacity < 1) {
                requestAnimationFrame(plusOpacity);
            }
            // popup-repair-types
        };
        plusOpacity();
        console.log(modal);
    };

    //MENU

    const menu = () => {
        const   popupDialogMenu = document.querySelector('.popup-dialog-menu'),
                    menuBtn = document.querySelector('.menu__icon'),
                    buttonFooter = document.querySelector('.button-footer'),
                    popupMenu = document.querySelector('.popup-menu');
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
        buttonFooter.addEventListener('click', goOnTop);

        //События по кнопкам меню
        popupMenu.addEventListener('click', event => {
            let     transform,
                    target = event.target;
            if (window.innerWidth < 576) {
                transform = 'translate3d(0, -100vh, 0)';
            }
            else {
                transform = 'translate3d(645px, 0, 0)';
            }
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
            console.log(target);
            if  (target.closest('.show-repair')){
                console.log('show popup');
                showModal('.popup-repair-types');
                popupDialogMenu.style.transform = transform;
            }
        });
        const anothBlockBtnShowModal = document.querySelector('.show-repair-modal');
        anothBlockBtnShowModal.addEventListener('click', () => showModal('.popup-repair-types'));
    };
    menu();
    //Аккордеон внизу
    const accordion = () => {
        const   accordion = document.querySelector('.accordion'),
                    items = document.querySelectorAll('h2');
        accordion.addEventListener('click', event => {
            let target = event.target;
            if (target.matches('.title_block')) {
                items[target.dataset.number].classList.toggle('msg-active')
            };
        })
    }
    accordion();

}); 