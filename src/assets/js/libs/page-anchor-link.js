// ページ内リンク
export default function () {
  'use strict';
  console.log('run__scroll-top.js');

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const anchorLinksArr = Array.prototype.slice.call(anchorLinks);

  anchorLinksArr.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.hash;
      const targetElement = document.querySelector(targetId);
      const headerHeight = document.getElementsByClassName('header')[0].clientHeight;
      const targetOffsetTop =
        window.pageYOffset + targetElement.getBoundingClientRect().top;
      window.scrollTo({
        top: targetOffsetTop - headerHeight,
        behavior: 'smooth',
      });
    });
  });
}
