import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default () => {
  // パララックスアイテム
  const paraImg01 = document.querySelector('.js-paraImg01');
  const paraImg02 = document.querySelector('.js-paraImg02');
  const paraImg03 = document.querySelector('.js-paraImg03');
  const paraTrigger01 = document.querySelector('.js-paraTrigger01');
  const paraTrigger02 = document.querySelector('.js-paraTrigger02');
  const paraTrigger03 = document.querySelector('.js-paraTrigger03');
  // パララックス関数
  function parallaxFunc(paraTarget, paraTrigger) {
    gsap.fromTo(
      paraTarget,
      { yPercent: 10 },
      {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: paraTrigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.1,
        },
      }
    );
  }
  // パララックス処理実行
  parallaxFunc(paraImg01, paraTrigger01);
  parallaxFunc(paraImg02, paraTrigger02);
  parallaxFunc(paraImg03, paraTrigger03);

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
};
