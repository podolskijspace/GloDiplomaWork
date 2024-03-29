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

        const getArrFromJSON = () => {
            console.log('Событие');
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
        getArrFromJSON();
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
                _thisBefore;
        blockWatched.addEventListener('mouseover', event => {
            const target = event.target;
            if (target.closest('.formula-item__icon-inner-text')){
                num = +target.textContent;
                let selector = `.formula-item-popup-0${num}`;
                _this = document.querySelectorAll(selector)[0];
                _thisBefore = document.querySelector(`${selector}-before`);
                if (_this.getBoundingClientRect().top < 10) {
                    _thisBefore.style.transform = "rotate(180deg)";
                    _thisBefore.style.top = "-10px";
                    _this.style.top = "110px";
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
                    _thisBefore = document.querySelector(`${selector}-before`);
                unShowModal(selector);
                setTimeout(() => {
                    _thisBefore.style.transform = "";
                    _thisBefore.style.top = "";
                    _this.style.top = "";
                }, 300);
                    
                
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

    //Документы
    const documentsSlider = () => {
        const   transparencyWrapper = document.querySelector('.transparency-slider-wrap'),
                    transparencyPopup = document.querySelector('.popup-transparency'),
                    slides = transparencyPopup.querySelectorAll('.popup-transparency-slider__slide');
        if (window.outerWidth <= 1090) {
        slider('.transparency-item', '.transparency-slider-wrap', '#transparency-arrow_left', 
        '#transparency-arrow_right');
        }
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
        slider('.popup-transparency-slider__slide', '.popup-transparency-slider-wrap', '#transparency_left', 
        '#transparency_right');
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
        const blockWatched = document.getElementById('problems'),
                    svgElems = blockWatched.querySelectorAll('.svg-wrap'),
                    sliderWrap = document.querySelector('.problems-slider'),
                    slides = sliderWrap.querySelectorAll('.problems-item'),
                    left = document.getElementById('problems-arrow_left'),
                    right = document.getElementById('problems-arrow_right');
        let     num,
                _this,
                _thisBefore,
                countSliders = 0;
        svgElems.forEach(item => item.addEventListener('mouseenter', event => {
                num = +item.dataset.number + 1;
                let selector = `.problems-item-popup-${num}`;
                _this = document.querySelectorAll(selector)[0];
                _thisBefore = document.querySelector(`${selector}-before`);
                if (_this.getBoundingClientRect().top < 10) {
                    _thisBefore.style.transform = "rotate(180deg)";
                    _thisBefore.style.top = "-10px";
                    _this.style.top = "110px";
                }
                showModal(selector);
        }));
        svgElems.forEach(item => item.addEventListener('mouseleave', event => {
            num = +item.dataset.number + 1;
            let selector = `.problems-item-popup-${num}`;
            _this = document.querySelector(selector);
            _thisBefore = document.querySelector(`${selector}-before`);
            unShowModal(selector);
            setTimeout(() => {
                _thisBefore.style.transform = "";
                _thisBefore.style.top = "";
                _this.style.top = "";
            }, 300);
            
        }));
        left.addEventListener('click', event => {
            countSliders--;
            if (countSliders < 0) {
                countSliders = slides.length - 1;
            }
            sliderWrap.insertAdjacentElement('afterbegin', slides[countSliders]);
            slides[countSliders].classList.add('active-item');
        });

        right.addEventListener('click', event => {
            countSliders++;
            if (countSliders > slides.length - 1) {
                countSliders = 0;
            }
            sliderWrap.insertAdjacentElement('afterbegin', slides[countSliders]);
            slides[countSliders].classList.add('active-item');
        });
    };
    problemPopup();

    //Слайдер карусель
    class sliderCarousel {
        constructor ({
        main, 
        wrap, 
        next,
        prev,
        position = 0,
        slidesToShow = 5,
        responsive = []
        }) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.slides = this.wrap.children;
        this.options = {
            position,
            widthSlide : Math.floor(100 / this.slidesToShow),
        };
        this.responsive = responsive;
        }

        init() {
        this.addPodolskijClass();
        this.addStyle();
        if (this.prev && this.next) {
            this.controlSlider();
        }
        else {
            this.addArrow();
            this.controlSlider();
        }
        if (this.responsive) {
            this.responseInit();
        }
        
        }

        addPodolskijClass () {
        this.main.classList.add('podolskij-slider');
        this.wrap.classList.add('podolskij-slider__wrap');
        
        for (let item of this.slides) {
            item.classList.add('podolskij-slider__item');
        }
        }

        addStyle () {
        let style = document.getElementById('sliderCarousel-style');
        if (!style){
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }
        
        style.textContent = `
            .podolskij-slider {
            overflow: hidden !important;
            }
            .podolskij-slider__wrap{
            display: flex !important;
            transition: transform 0.5s !important;
            will-change: transform !important;
            }
            .podolskij-slider__item{
            flex: 0 0 ${this.options.widthSlide}% !important;
            margin: auto 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-around !important;
            }
        `;
        document.head.appendChild(style);
        }

        controlSlider () {
        this.prev.addEventListener('click', () => this.prevSlider());
        this.next.addEventListener('click', () => this.nextSlider());
        }

        prevSlider () {
        if (this.options.position > 0) {
            --this.options.position;
            this.wrap.style.transform = `translateX(-${this.options.widthSlide * this.options.position}%)`;
        }
        }

        nextSlider () {
        if  (this.options.position < this.slides.length - this.slidesToShow){
            ++this.options.position;
            this.wrap.style.transform = `translateX(-${this.options.widthSlide * this.options.position}%)`;
        }
        }

        addArrow () {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'podolskij-slider__prev';
        this.next.className = 'podolskij-slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.getElementById('sliderCarousel-style');
        style.textContent += `
            .podolskij-slider__prev,
            .podolskij-slider__next{
            margin: 0 10px;
            border: 20px solid transparent;
            background: transparent;
            }
            .podolskij-slider__next {
            border-left-color: #19b5fe;
            }
            .podolskij-slider__prev {
            border-right-color: #19b5fe;
            }
        `;
        }

        responseInit () {
        const slidesToShowDefault = this.slidesToShow,
                    allResponse = this.responsive.map(item => item.breakpoint),
                    allSlidesToShow = this.responsive.map(item => item.slideToShow);
        
        const checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;
        let count = 0;
        allResponse.forEach ((item, i) => {
            if (widthWindow < item) {
            count++;
            this.slidesToShow = allSlidesToShow[i];
            }
        });
        if (count === 0) {
            this.slidesToShow = slidesToShowDefault;
        }
        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
        this.addStyle();
        
        };

        checkResponse();
        window.addEventListener('resize', checkResponse);
        }


    }

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
    const getResponseTabs = (wrapper, left, right) => {

        let    width = wrapper.clientWidth,
                elems = [...wrapper.children],
                elemWidth = elems.reduce((accum, item) => {
                    return accum + item.clientWidth;
                }, 0) / elems.length,
                numberElems = elems.length,
                numberSpaces = numberElems + 1,
                spaceWidth = (width -  numberElems * elemWidth) / numberSpaces,
                position = spaceWidth + elemWidth,
                visibleWidth = wrapper.parentElement.clientWidth,
                steps = [],
                currentPosition = 1,
                arrowLeft = document.querySelector(left),
                arrowRight = document.querySelector(right);
        steps[0] = visibleWidth;
        while (position <= width) {
            if (position > visibleWidth) {
                steps[currentPosition] = position; 
                currentPosition++;
            }
            position += spaceWidth + elemWidth;
        }
        currentPosition = 0;
        

        arrowRight.addEventListener('click', () => {
            currentPosition++;
            if (currentPosition >= steps.length - 1) {
                currentPosition = steps.length - 1;
            }
            let translateX = steps[currentPosition] - visibleWidth;
            wrapper.style.transform = `translateX(-${translateX}px)`;
        });

        arrowLeft.addEventListener('click', () => {
            currentPosition--;
            if (currentPosition < 0) {
                currentPosition = 0;
            }
            let translateX = steps[currentPosition] - visibleWidth;
            wrapper.style.transform = `translateX(-${translateX}px)`;
        });
    };

    getResponseTabs(document.getElementById('scheme-list'), '#nav-arrow-scheme_left', '#nav-arrow-scheme_right');

    //Блок виды ремонда. Слайдер и табы

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
            getResponseTabs(tabsNav, '#nav-arrow-repair-left_base', '#nav-arrow-repair-right_base');
        }
    };
    moveRepairBlock();

    //Добавляем слайдер на подсказки и проблемы

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

    sliderCarouselSpecial('#formula-arrow_left', '#formula-arrow_right', '.formula-slider ', '.formula-slider__slide');


    //Блок с плагинацией и прочей лабудой)

    const moveDesignsBlock = () => {
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
        getResponseTabs(tabsNav, '#nav-arrow-designs_left', '#nav-arrow-designs_right');
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
    moveDesignsBlock();
    //блок с портфолио 
    const portfolio = () => {
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
    portfolio();
    
});  