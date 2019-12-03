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
});