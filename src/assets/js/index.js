'use strict';

import imagesLoaded from 'imagesloaded';
import { BarbaTransition } from './libs/barba-transition';
import loadingAnime from './libs/loading-anime';
// import ScrollObserver from './libs/scroll-observer';
// import { gsap } from 'gsap';

// 初期化
document.addEventListener('DOMContentLoaded', function () {
  console.log('---------------------\nDOMContentLoaded\n---------------------');

  const watchTarget = document.querySelector('.l-wrapper');
  const imgLoad = imagesLoaded(watchTarget, { background: true });
  imgLoad.on('always', () => {
    console.log(
      '---------------------\nDONE__imagesLoaded\n---------------------'
    );
    //   // ローディング処理
    loadingAnime();
    //   // barba init
    const barbaInit = new BarbaTransition();
  });
});

// class Main {
//   constructor() {
//     this._observers = []; //オブザーバーで監視する要素が複数あるため配列にする
//     this._init();
//   }

//   //オブザーバーする要素をすべて配列に入れる
//   set observers(val) {
//     this._observers.push(val);
//   }
//   //オブザーバーする要素を参照したときに関数を呼び出す
//   get observers() {
//     return this._observers;
//   }
//   // 初期化処理（ここに実行する処理を追記していく
//   _init() {
//     // すべての画像の読み込みが完了したタイミングで処理する（背景画像を含む
//     const watchTarget = document.querySelector('.l-wrapper');
//     const imgLoad = imagesLoaded(watchTarget, { background: true });
//     imgLoad.on('always', () => {
//       console.log(
//         '---------------------\nDONE__imagesLoaded\n---------------------'
//       );
//       const barbaInit = new BarbaTransition();
//       this._scrollInit();
//     });
//   }
//   //検証用
//   _consoleLog(el, isShow) {
//     if (isShow) {
//       console.log(el);
//     }
//   }
//   // is-showクラスを付ける
//   _addClassInview(el, isShow) {
//     if (isShow) {
//       el.classList.add('is-show');
//     }
//   }

//   // オブザーバー要素をすべて削除する
//   _destroyObservers() {
//     this.observers.forEach((ob) => {
//       ob.destroy();
//     });
//   }
//   destroy() {
//     this._destroyObservers();
//   }

//   // スクロールで発火する処理をここにまとめて追記
//   _scrollInit() {
//     if (document.querySelector('.js-showIn')) {
//       // インスタンス生成
//       this.observers = new ScrollObserver('.js-showin', this._addClassInview, {
//         routMargin: '0% 0%',
//       });
//     }
//   }
// }
