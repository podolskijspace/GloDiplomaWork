const makeForm = (selector) => {
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

export default makeForm;