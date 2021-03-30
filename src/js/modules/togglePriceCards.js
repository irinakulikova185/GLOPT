const togglePriceCards = () => {
    const toggleSlide = (btnsSelector) => {
        const btns = document.querySelectorAll(btnsSelector),
              pricesContent = document.querySelectorAll('.prices__content'),
              pricesInfo = document.querySelectorAll('.prices__info');
        btns.forEach((btn, i)  => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                pricesContent[i].classList.toggle('prices__content_active');
                pricesInfo[i].classList.toggle('prices__info_active');
            });
        });
            
        };

    toggleSlide('.button_details');
    toggleSlide('.prices__link');
};

export default togglePriceCards;