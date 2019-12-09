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

export default accordion;