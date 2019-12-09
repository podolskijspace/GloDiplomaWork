const problemPopup = () => {
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

export default problemPopup;