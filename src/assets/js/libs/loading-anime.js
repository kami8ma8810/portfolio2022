import { gsap } from 'gsap';

export default () => {
  const loadingEl = document.getElementById('js-loading');
  if (loadingEl !== null) {
    const clipStart = () => {
      loadingEl.classList.add('is-done');
    };

    const tl = gsap.timeline();
    tl.to(['.l-loading__chars', '.l-loading__logo'], {
      opacity: 0,
      delay: 1.2,
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
