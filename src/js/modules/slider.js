const slider = () => {
    const slides = document.querySelectorAll('.feed-back__item'),
    sliderField = document.querySelector('.feed-back__inner'),
    sliderWrapper = document.querySelector('.feed-back__carousel'),
    width = window.getComputedStyle(sliderWrapper).width,
    next = document.querySelector('.feed-back__arrowNext'),
    prev = document.querySelector('.feed-back__arrowPrev'),
    dots = document.querySelectorAll('.feed-back__dot');


let sliderIndex = 1,
 offset = 0,
 posInit = 0,
 posX1 = 0,
 posX2 = 0,
 posFinal = 0,
 trfRegExp = /[-0-9.]+(?=px)/,
 posThreshold = deleteNotDigits(width) * 0.3;

sliderField.style.width = 100*slides.length + '%';
sliderField.style.display = 'flex';
slides.forEach(slide => {
     slide.style.width = width;
 });  
sliderField.style.transition = 'all 1s';
sliderWrapper.style.overflow = 'hidden';
sliderField.style.transform = 'translateX(0px)';

function deleteNotDigits(str) {
 return Math.round(str.replace(/px/g, ''));
}

next.addEventListener('click', () => {
 if(offset == deleteNotDigits(width) * (slides.length - 1)) {
     offset = 0;
 } else {
     offset += deleteNotDigits(width);
 }
 sliderField.style.transform = `translateX(-${offset}px)`;

});

prev.addEventListener('click', () => {
 if(offset == 0) {
     offset = deleteNotDigits(width) * (slides.length - 1);
 } else {
     offset -= deleteNotDigits(width);
 }
 sliderField.style.transform = `translateX(-${offset}px)`;

});
dots.forEach( dot => {
 if(sliderIndex == 1) {
      dots[sliderIndex - 1].style.opacity = '1';
 }
} );

function setActiveDot() {
 dots.forEach(dot => dot.style.opacity = '0.5');
 dots[sliderIndex - 1].style.opacity = '1';
}
dots.forEach(dot => {
 dot.addEventListener('click', (e) => {
     const slideTo = e.target.getAttribute('data-slide-to');

     sliderIndex = slideTo;
     offset = deleteNotDigits(width) * (sliderIndex - 1);
     console.log(deleteNotDigits(width));
     sliderField.style.transform = `translateX(-${offset}px)`;

     setActiveDot();
 });
});
//свайп
sliderWrapper.addEventListener('touchstart', swipeStart);
  sliderWrapper.addEventListener('mousedown', swipeStart);
  function swipeStart(event) {
        let evt = event.type.includes('touch') == true ? event.touches[0] : event;
        posInit = posX1 = evt.clientX;
        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('mouseup', swipeEnd);
  }  
  function swipeAction(event) {
    let evt = event.type.includes('touch') == true ? event.touches[0] : event;
    let style = sliderField.style.transform,
    transform = +style.match(trfRegExp)[0];
    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;
    sliderField.style.transform = `translateX(${transform - posX2}px)`;
  }
  
  function swipeEnd(e) {
    posFinal = posInit - posX1;
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);
  
    if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
            if(sliderIndex == 1) {
                sliderIndex = slides.length;
                

            } else {
                sliderIndex--;
            }
          
        } else if (posInit > posX1) {
            if(sliderIndex == slides.length) {
                sliderIndex = 1;
                
            } else {
                sliderIndex++;
            }
          
        }
      }
      if (posInit !== posX1) {
            offset = deleteNotDigits(width) * (sliderIndex - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;
    
            setActiveDot();
      }  
      }
};

export default slider;