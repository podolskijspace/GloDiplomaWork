const helpPopup = () => {
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

export default helpPopup;