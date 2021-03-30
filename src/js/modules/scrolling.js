const scrolling = () => {
    const upElems = document.querySelectorAll('.pageup'),
          links = document.querySelectorAll('[href^="#"]');

    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > 1650) {

            upElems.forEach(upElem => {
                upElem.classList.add('animated', 'fadeIn');
                upElem.classList.remove('fadeOut');
                upElem.style.display = 'block';
            });
            
            
        } else {
            upElems.forEach(upElem => {
                upElem.classList.add('animated', 'fadeOut');
                upElem.classList.remove('fadeIn');
                upElem.style.display = 'none';
            });
            
        }
    });

    const element = document.documentElement,
          body = document.body;

    const calcScroll = (elements) => {
        elements.forEach(el => {
            el.addEventListener('click', function (event) {
                let scrollTop = Math.round(element.scrollTop || body.scrollTop);
                if(this.hash !== '') {
                    event.preventDefault();
    
                    let hashElement = document.querySelector(this.hash),
                        hashElementTop = 0;
                        
    
                    while(hashElement.offsetParent) {
                        hashElementTop += hashElement.offsetTop;
                        hashElement = hashElement.offsetParent;
                    } 
                    
                    hashElementTop = Math.round(hashElementTop);
                    
    
                    smoothScroll(scrollTop, hashElementTop, this.hash); 
                }
            });
        });
        

    };
    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1,
            prevScrollTop,
            speed;

        if( to > from) {
            speed = 30;
        } else {
            speed = -30;
        }
        
        let move = setInterval(function() {
            let scrollTop = Math.round(element.scrollTop || body.scrollTop);

            if(prevScrollTop === scrollTop || (to > from && scrollTop >= to) || (to < from && scrollTop <= to)) {
                clearInterval(move);
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
            } else {
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = scrollTop;
            }
        }, timeInterval);

        
    }; 
    calcScroll(upElems);
    calcScroll(links);   
};

export default scrolling;