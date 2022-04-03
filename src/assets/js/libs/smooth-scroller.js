import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);
// gsap.registerPlugin(ScrollTrigger);

export default () => {
  function smoothScroll(toBottom) {
    let direction = '-=250';
    if (toBottom) {
      direction = '+=250';
    }
    gsap.to('.l-main__inner', {
      scrollTo: { y: direction, autoKill: true },
      duration: 1,
      ease: 'power4.out',
    });
  }

  let startY;
  function touchstart(e) {
    startY = e.changedTouches[0].pageY;
  }
  function touchmove(e) {
    e.preventDefault();
    const moveY = e.changedTouches[0].pageY;
    if (moveY < startY) {
      smoothScroll(true);
    } else {
      smoothScroll(false);
    }
  }
  function mousemove(e) {
    e.preventDefault();
    if (0 < e.deltaY) {
      smoothScroll(true);
    } else {
      smoothScroll(false);
    }
  }
  document.addEventListener('touchstart', touchstart, { passive: false });
  document.addEventListener('touchmove', touchmove, { passive: false });
  document.addEventListener('mousewheel', mousemove, { passive: false });
};
