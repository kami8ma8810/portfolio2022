'use strict';
// vendorsから読み込む外部ファイル
import imagesLoaded from 'imagesloaded';
// libsから読み込むファイル
import drawer from './libs/drawer';
import pageAnchorLink from './libs/page-anchor-link';
import ScrollObserver from './libs/scroll-observer';
import setFillHeight from './libs/set-fill-height';
import switchDarkMode from './libs/switch-dark-mode';
import topFvAnime from './libs/top-fv-anime';
import ua from './libs/ua-parser';

// 初期化
document.addEventListener('DOMContentLoaded', function () {
  console.log('---------------------\nDOMContentLoaded\n---------------------');
  // スクロール位置の復元
  // if (history.scrollRestoration) {
  //   history.scrollRestoration = 'auto';
  // }
  const main = new Main();
});

// クラスの生成
class Main {
  constructor() {
    this._observers = []; //オブザーバーで監視する要素が複数あるため配列にする
    this._init();
  }

  //オブザーバーする要素をすべて配列に入れる
  set observers(val) {
    this._observers.push(val);
  }
  //オブザーバーする要素を参照したときに関数を呼び出す
  get observers() {
    return this._observers;
  }
  // 初期化処理（ここに実行する処理を追記していく
  _init() {
    // ユーザーエージェント判定
    ua.init();
    // ダークモード
    switchDarkMode();
    //100vhのsafariフォールバック
    setFillHeight();
    drawer();
    // locomotive初期化
    locomotiveGsap();
    // すべての画像の読み込みが完了したタイミングで処理する（背景画像を含む
    const watchTarget = document.querySelector('.common-container');
    const imgLoad = imagesLoaded(watchTarget, { background: true });
    imgLoad.on('always', () => {
      console.log(
        '---------------------\nDONE__imagesLoaded\n---------------------'
      );
      // drawer();
      // this._scrollInit();
      // if (document.querySelector('.js-topFvAnime') !== null) {
      //   topFvAnime();
      // }
      // if (document.querySelector('.js-pageAnchorLink') !== null) {
      //   pageAnchorLink();
      // }
    });
  }
  //検証用
  _consoleLog(el, isShow) {
    if (isShow) {
      console.log(el);
    }
  }
  // is-showクラスを付ける
  _addClassInview(el, isShow) {
    if (isShow) {
      el.classList.add('is-show');
    }
  }
  // member個別ページ専用
  _addClassArrow(el, isShow) {
    if (isShow) {
      el.classList.add('is-arrow');
    }
  }

  // オブザーバー要素をすべて削除する
  _destroyObservers() {
    this.observers.forEach((ob) => {
      ob.destroy();
    });
  }
  destroy() {
    this._destroyObservers();
  }

  // スクロールで発火する処理をここにまとめて追記
  _scrollInit() {
    if (document.querySelector('.js-showin')) {
      // インスタンス生成
      this.observers = new ScrollObserver('.js-showin', this._addClassInview, {
        routMargin: '0% 0%',
      });
    }
    if (document.querySelector('.js-fvarrow')) {
      this.observers = new ScrollObserver('.js-fvarrow', this._addClassArrow);
    }
    if (document.querySelector('.js-fvshow')) {
      // インスタンス生成
      this.observers = new ScrollObserver(
        // 要素を指定
        '.js-fvshow',
        // 実行するインスタンスを指定
        this._addClassInview
        // オプションを変更する場合の書き方
        // { routMargin: '0% 0%' }
      );
    }
  }
}
