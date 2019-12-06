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
            const getArrFromJSON = () => {
                fetch('../db/db.json')
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error ('Status network not 200');
                    }
                    return (response.json());
                })
                .then (data => {
                    addTabsOnRepairPopup(data);
                })
                .catch (error => console.error(error));
            };

            let k = 0;
            const addTabsOnRepairPopup = (arr) => {
                const   btnsList = repairModal.querySelector('.nav-list-popup-repair'),
                            title = repairModal.querySelector('.popup-repair-types-content__head-title'),
                            tableWrapper = document.querySelector('tbody');

                

                for (let item of arr) {
                    const   btn = document.createElement('button');

                    k++;

                    btn.classList = 'button_o popup-repair-types-nav__item';
                    btn.textContent = item.title;
                    btnsList.appendChild(btn);
                    btn.dataset.number = k;

                    for (let insideItem of item.priceList) {
                        const   trElems = [],
                                    tr = document.createElement('tr');

                        tr.classList = 'mobile-row';
                        tableWrapper.appendChild(tr);
                        tr.dataset.number = k;
                        if (k != 1) {
                            tr.style.display = 'none';
                        }

                        for (let i = 0; i <= 4; i++) {
                            trElems[i] = document.createElement('td');
                        }

                        trElems[0].classList = 'repair-types-name';
                        trElems[1].classList = 'mobile-col-title tablet-hide desktop-hide';
                        trElems[2].classList = 'mobile-col-title tablet-hide desktop-hide';
                        trElems[3].classList = 'repair-types-value';
                        trElems[4].classList = 'repair-types-value';

                        trElems[0].textContent = insideItem.typeService;
                        trElems[1].textContent = 'Ед.измерения';
                        trElems[2].textContent = 'Цена за ед.';
                        trElems[3].textContent = insideItem.units;
                        trElems[4].textContent = insideItem.cost;

                        for (let i = 0; i <= 4; i++) {
                            tr.appendChild(trElems[i]);
                        }
                    }
                }
                btnsList.addEventListener('click', event => {
                    const target = event.target;

                    if (target.matches('.popup-repair-types-nav__item')) {
                        const   elems = repairModal.querySelectorAll('.mobile-row'),
                                    num = target.dataset.number;
                        title.textContent = target.textContent;
                        for ( let item of elems) {
                            if  (item.dataset.number === num) {
                                item.style.display = '';
                            }
                            else {
                                item.style.display = 'none';
                            }
                        }
                    }
                });
            };

            if  (target.closest('.show-repair')){
                showModal('.popup-repair-types');
                popupDialogMenu.style.transform = transform;
                if (!repairModal.dataset.first) {
                    repairModal.dataset.first = "false";
                    getArrFromJSON();
                }
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
                _thisBefore;
        blockWatched.addEventListener('mouseover', event => {
            const target = event.target;
            if (target.closest('.formula-item__icon-inner-text')){
                num = +target.textContent;
                let selector = `.formula-item-popup-0${num}`;
                _this = document.querySelectorAll(selector)[0];
                _thisBefore = document.querySelector(`${selector}-before`);
                items = document.querySelectorAll('.formula-item');
                console.dir();
                if (_this.getBoundingClientRect().top < 10) {
                    console.log('УРА');
                    _thisBefore.style.transform = "rotate(180deg)";
                    _thisBefore.style.top = "-10px";
                    _this.style.top = "110px";
                }
                else {
                    _thisBefore.style.transform = "";
                    _thisBefore.style.top = "";
                    _this.style.top = "";
                }
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
    const makeForm = (selector) => {
        const successPopup = document.querySelector('.popup-thank');
        let form = document.querySelector(selector),
            statusMessage = document.createElement('div'),
            inputs = form.querySelectorAll('input');

        const outputData = (response) => {
            if (response.status !== 200) {
                throw new Error ('status network not 200');
            }
            showModal('.popup-thank');
            inputs.forEach(item => item.value = '');
        },
        errorData = (error) => {
            console.error(error);
        };
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            let body = {};
            for (let val of formData.entries()) {
                body[val[0]] = val[1];
            }
            postData(body)
            .then(outputData)
            .catch(errorData);
        });
        const postData = (body) => { 
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        };
        successPopup.querySelector('.close').addEventListener('click', () => unShowModal('.popup-thank'));
    };
    for (let i = 1; i <= 6; i++) {
        makeForm(`#feedback${i}`);
    }
    //СЛАЙДЕР
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
        }
        
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

    //Документы
    const documentsSlider = () => {
        const   transparencyWrapper = document.querySelector('.transparency-slider-wrap'),
                    transparencyPopup = document.querySelector('.popup-transparency'),
                    slides = transparencyPopup.querySelectorAll('.popup-transparency-slider__slide');
        if (window.outerWidth <= 1090) {
        slider('.transparency-item', '.transparency-slider-wrap', '#transparency-arrow_left', '#transparency-arrow_right');
        }
        transparencyWrapper.addEventListener('click', event => {
            const target = event.target;
            if (target.matches('.transparency-item__img')) {
                showModal('.popup-transparency');
                slides[+target.dataset.number].classList.add('podolskij-active');
            }
            
        });
        transparencyPopup.querySelector('.close').addEventListener('click', event => {
            unShowModal('.popup-transparency')
            slides.forEach(item => item.classList.remove('podolskij-active'));
        });
        slider('.popup-transparency-slider__slide', '.popup-transparency-slider-wrap', '#transparency_left', '#transparency_right');
    };
    
    documentsSlider();
    
    //Маска телефона
    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
        const elem = document.querySelector(selector);
    
        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i != -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type == "blur" && this.value.length < 5) {
                this.value = "";
            }
    
        }
    
        elem.addEventListener("input", mask);
        elem.addEventListener("focus", mask);
        elem.addEventListener("blur", mask);
    }

    for (let i = 1; i <= 6; i++) {
        maskPhone(`#feedback-input${i}`);
    }
    
    //Подсказки в блоке с проблемами
    const problemPopup = () => {
        const blockWatched = document.getElementById('problems');
        let     num,
                _this,
                _thisBefore;
        blockWatched.addEventListener('mouseover', event => {
            const target = event.target;
            if (target.matches('.svg-wrap')){
                num = +target.dataset.number + 1;
                let selector = `.problems-item-popup-${num}`;
                _this = document.querySelectorAll(selector)[0];
                _thisBefore = document.querySelector(`${selector}-before`);
                if (_this.getBoundingClientRect().top < 10) {
                    _thisBefore.style.transform = "rotate(180deg)";
                    _thisBefore.style.top = "-10px";
                    _this.style.top = "110px";
                }
                else {
                    _thisBefore.style.transform = "";
                    _thisBefore.style.top = "";
                    _this.style.top = "";
                }
                showModal(selector);
            }
        });
        blockWatched.addEventListener('mouseout', event => {
            const target = event.target;
            if (target.matches('.svg-wrap')){
                num = +target.dataset.number + 1;
                let selector = `.problems-item-popup-${num}`;
                _this = document.querySelector(selector);
                unShowModal(selector);
                
            }
        });
    };
    problemPopup();


    
});  