// 現在表示しているのページをハイライトしてaタグにclass付与
export default () => {
  console.log('RUN__highlight-nav.js');
  // クラス名を定義
  const CLASS_NAME = 'is-current';
  // 現在のページのhrefを取得
  let currentHref = location.href;
  // 現在のページのすべてのヘッダーナビのhrefを取得
  const navLinks = document.querySelectorAll('.js-highlightLink');

  // 現在のページのナビの項目にis-currentクラスを付与、href属性を削除
  for (let i = 0; i < navLinks.length; i++) {
    let navHref = navLinks[i].href;
    if (currentHref === navHref) {
      navLinks[i].classList.add(CLASS_NAME);
      navLinks[i].removeAttribute('href');
    }
  }
};
