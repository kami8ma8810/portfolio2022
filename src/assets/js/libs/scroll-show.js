'use strict';

export default () => {
  const targets = document.querySelectorAll('.js-showIn');
  function doWhenTargetObserve(entries, observerStop) {
    entries.forEach((entry) => {
      // 監視範囲にないときは何もしない
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('is-show');
      //一度処理したら監視をやめる
      observerStop.unobserve(entry.target);
    });
  }
  // 監視範囲
  const options = {
    root: null,
    rootMargin: '-10% 0%',
    once: true,
  };
  const observer = new IntersectionObserver(doWhenTargetObserve, options);

  // ターゲットを監視
  targets.forEach((target) => {
    observer.observe(target);
  });
};
