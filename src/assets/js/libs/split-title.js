'use strict';

class SpanWrapText {
  constructor(target) {
    this.target = target;
    this.nodes = this.target.childNodes;
    this.convert();
  }

  /**
   * @method convert
   * @description テキストを1文字ずつspanで囲む
   */
  convert() {
    this.target.style.opacity = 1;
    console.log('RUN__split-title.js');
    let spanWrapText = '';

    this.nodes.forEach((node) => {
      if (node.nodeType == 3) {
        // テキストの場合
        // 改行コードを削除
        const text = node.textContent.replace(/\r?\n/g, '');
        // spanタグで囲んで連結
        spanWrapText =
          spanWrapText +
          text.split('').reduce((accumulator, currentValue) => {
            currentValue = currentValue.replace(' ', '&nbsp;');
            return accumulator + `<span>${currentValue}</span>`;
          }, '');
      } else {
        // テキスト以外の場合
        // brなどの要素はそのまま連結
        spanWrapText = spanWrapText + node.outerHTML;
      }
    });

    this.target.innerHTML = spanWrapText;
  }
}
export { SpanWrapText };
