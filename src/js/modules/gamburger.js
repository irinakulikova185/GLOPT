const gamburger = () => {
    const menu = document.querySelector('.header__menu'),
    menuItem = menu.querySelectorAll('.header__link'),
    hamburger = document.querySelector('.hamburger'),
    menuOverlay = document.querySelector('.menu_overlay');

    hamburger.addEventListener('click', () => {

      hamburger.classList.toggle('hamburger_active');
      menu.classList.toggle('header__menu_active');
      document.body.style.overflow = 'hidden';
      menuOverlay.style.display = 'block';
      
       
    });
    hamburger.addEventListener('click', () => {
      if(!hamburger.classList.contains('hamburger_active')) {
          document.body.style.overflow = '';
          menuOverlay.style.display = '';
      }
  });
  function closeHamburgerMenu() {
      hamburger.classList.toggle('hamburger_active');
      menu.classList.toggle('header__menu_active');
      document.body.style.overflow = '';
      menuOverlay.style.display = '';
  }  
     
   menuItem.forEach(item => {
      item.addEventListener('click', closeHamburgerMenu);
   }); 

  menuOverlay.addEventListener('click', closeHamburgerMenu);

};

export default gamburger;