
const modals = () => {
    
    let btnPressed = false;
    
    function bindModal(triggerSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector('#recall'),
              close = document.querySelectorAll('.modal__close'),
              overlay = document.querySelector('.overlay'),
              mods = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

    function openModal(modal) {
            mods.forEach(item =>{
                item.style.display = 'none';
                
            });
            overlay.style.display = 'block';
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = `${scroll}px`;

        }
        
    trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                btnPressed = true;
                openModal(modal);
            
            });
        });
    
    function closeModal() {
        overlay.style.display = 'none';
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
    }

    close.forEach(item => {
        item.addEventListener('click', closeModal)
    });
    

    overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }


    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.append(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }
    
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
        
    }

    bindModal('.button_recall');
    bindModal('.button_calculation');
    bindModal('.button_prices');
    openByScroll('.button_recall');

};

export default modals;