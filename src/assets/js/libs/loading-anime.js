import { gsap } from 'gsap';

export default () => {
  const loadingEl = document.getElementById('js-loading');
  if (loadingEl !== null) {
    const tl = gsap.timeline();
    const clipStart = () => {
      loadingEl.classList.add('is-done');
    };

    tl.to(['.l-loading__chars', '.l-loading__logo'], {
      opacity: 0,
      delay: 2.4,
      duration: 0.4,
    })
      .call(clipStart)
      .to(loadingEl, {
        autoAlpha: 0,
        display: 'none',
        delay: 1.2,
      });
  }
};
