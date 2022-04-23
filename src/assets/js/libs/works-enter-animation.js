'use strict';

import gsap from 'gsap';

export default (container) => {
  const transitionIn = container.querySelectorAll('.js-transitionIn');
  const transitionOut = container.querySelectorAll('.js-transitionOut');

  function moveImg() {
    transitionIn.forEach((el) => {
      el.classList.add('is-active');
    });
  }

  const tl = gsap.timeline({
    defaults: {
      // duration: 0.4,
    },
  });

  tl.call(moveImg).to(transitionOut, {
    opacity: 1,
    duration: 0.8,
  });
};
