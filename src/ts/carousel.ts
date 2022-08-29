import { Slider } from './Slider';

window.addEventListener('load', () => {
  let mySlide = new Slider( ".about2-carousel__item", {
    dotsWrapper: ".dots-container",
    showDots: true,
    autoSpeed: 5600,
  });

  let mySlideHomepage = new Slider( ".about2-carousel .homepage-carousel", {
    dotsWrapper: ".dots-container",
    showDots: false,
    autoSpeed: 5600,
  });
});