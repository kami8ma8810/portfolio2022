import { gsap } from 'gsap';

export default () => {
  console.log('RUN__loading-anime.js');
  const tl = gsap.timeline();
  tl.to('.loading__logo', { duration: 0.3, autoAlpha: 0, delay: 0.5 }).to(
    '.loading',
    { yPercent: -101, duration: 0.8, ease: 'power2.inOut' }
  );
};
