const menu = () => {
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

export default menu;