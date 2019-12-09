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

export default showModal;