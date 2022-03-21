// 横スクロールが発生したときに検証する用（コンソールに貼り付ける
const width = document.documentElement.clientWidth;
$$('*').forEach((el) => {
  el.style.outline = '1px solid tomato';
  if (width < el.clientWidth) {
    console.log(el);
  }
});
