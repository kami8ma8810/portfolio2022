'use strict';

import gsap from 'gsap';

export default (container) => {
  const transitionIn = container.querySelectorAll(
    '.swiper-slide-active .js-transitionIn'
  );
  const transitionOut = container.querySelectorAll('.js-transitionOut');
  const fadeoutSlide_1 = container.querySelector('.swiper-slide-next');
  const fadeoutSlide_2 = container.querySelector('.swiper-slide-prev');

  function moveImg() {
    transitionIn.forEach((el) => {
      el.classList.add('is-active');
    });
    transitionOut.forEach((el) => {
      el.classList.add('is-active');
    });
  }

  const tl = gsap.timeline({
    defaults: {
      // duration: 0.4,
    },
  });

  tl.to([transitionOut, fadeoutSlide_1, fadeoutSlide_2], {
    opacity: 0,
    duration: 0.4,
  }).call(moveImg);
};
