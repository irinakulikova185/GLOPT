// const { on } = require("gulp");
import forms from './modules/forms';
import gamburger from './modules/gamburger';
import mask from './modules/mask';
import scrolling from './modules/scrolling';
import slider from './modules/slider';
import togglePriceCards from './modules/togglePriceCards';
import modals from './modules/modals';

window.addEventListener('DOMContentLoaded', () => {
    forms();
    gamburger();
    slider();
    scrolling();
    togglePriceCards();
    mask('[name = phone]');
    modals();

});
