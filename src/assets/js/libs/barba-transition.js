'use strict';

import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import gsap from 'gsap';

import drawer from './drawer';
import highlightNav from './highlight-nav';
import setFillHeight from './set-fill-height';
import { SpanWrapText } from './split-title';
import slider from './slider';
import switchDarkMode from './switch-dark-mode';
import ua from './ua-parser';
// import worksLeaveAnimation from './works-leave-animation';
// import worksEnterAnimation from './works-enter-animation';

class BarbaTransition {
  constructor() {
    this._init();
  }
  _init() {
    console.log('RUN__barba-transition.js');

    // 遅延用の関数
    function delay(n) {
      n = n || 2000;
      return new Promise((done) => {
        setTimeout(() => {
          done();
        }, n);
      });
    }

    // titleタグ以外のmetaタグの情報の書き換えを行う
    function replaceHeadTags(target) {
      console.log('◆◆◆◆◆ replace head tags ◆◆◆◆◆');
      const head = document.head;
      const targetHead = target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
      const newPageHead = document.createElement('head');
      newPageHead.innerHTML = targetHead;
      const removeHeadTags = [
        // 書き換える項目のみ指定する titleはbarbaのデフォルトで書き変わる
        "meta[name='keywords']",
        "meta[name='description']",
        "meta[name='robots']",
        "meta[property^='og']",
        "meta[name^='twitter']",
        "link[rel='prev']",
        "link[rel='next']",
        "script[src^='']",
        "link[rel='canonical']",
        // 'meta[itemprop]',
        // "meta[property^='fb']",
        // 'link[itemprop]',
      ].join(',');
      const headTags = [...head.querySelectorAll(removeHeadTags)];
      headTags.forEach((item) => {
        head.removeChild(item);
      });
      const newHeadTags = [...newPageHead.querySelectorAll(removeHeadTags)];
      newHeadTags.forEach((item) => {
        head.appendChild(item);
      });
    }

    // bodyスクロール不可
    function disableScrollBody() {
      document.body.style.overflow = 'hidden';
    }
    // bodyスクロール許可
    function enableScrollBody() {
      document.body.style.overflow = 'auto';
    }

    // アクセス時の処理
    function onceAnimation() {
      // ユーザーエージェント判定
      ua.init();
      // ダークモード
      switchDarkMode();
      //100vhのsafariフォールバック
      setFillHeight();
      // メニュー動作
      drawer();
      // 現在のディレクトリをハイライト
      highlightNav();
      // タイトルアニメーション
      if (document.querySelector('.js-splitTitle') !== null) {
        document.querySelectorAll('.js-splitTitle').forEach((element) => {
          new SpanWrapText(element);
        });
      }
      // worksページslider
      if (document.querySelector('.swiper') !== null) {
        slider();
      }
      const logo = document.querySelectorAll('.l-header__logo');
      gsap.to(logo, {
        opacity: 1,
      });
    }

    // ページを離脱するときのアニメーション（enter）
    function leaveAnimation(el) {
      console.log('leave animation!');
      const mainCurrent = el.current.container.querySelector('.l-main');
      const mainInnerCurrent =
        el.current.container.querySelector('.l-main__inner');
      const mainNext = el.next.container.querySelector('.l-main');
      const mainInnerNext =
        el.current.container.querySelector('.l-main__inner');
      const logo = el.current.container.querySelectorAll('.l-header__logo');

      const tl = gsap.timeline();
      tl.to([mainInnerCurrent, mainInnerNext, logo], {
        opacity: 0,
        duration: 0.2,
      }).to([mainCurrent, mainNext], {
        transformOrigin: 'top',
        scaleY: 0,
        duration: 0.4,
      });
    }
    // ページが表示されるときのアニメーション（enter）
    function enterAnimation(el) {
      console.log('enter animation!');
      const main = el.next.container.querySelector('.l-main');
      const mainInner = el.next.container.querySelector('.l-main__inner');
      const logo = el.next.container.querySelectorAll('.l-header__logo');

      const tl = gsap.timeline();
      tl.to(main, {
        transformOrigin: 'bottom',
        scaleY: 1,
        duration: 0.4,
      })
        .from(mainInner, {
          opacity: 0,
          duration: 0.2,
        })
        .to(logo, {
          opacity: 1,
          duration: 0.2,
        });
    }

    // prefetchはinitより前で実行
    barba.use(barbaPrefetch);

    // barba.hooks：すべてのページで発火
    barba.hooks.beforeLeave((data) => {
      console.log('●●●●● hooks beforeLeave ●●●●●');
      // console.log(data.current.container);
      disableScrollBody();
    });

    barba.hooks.leave((data) => {
      console.log('●●●●● hooks leave ●●●●●');
      // console.log(data.current.container);
    });

    barba.hooks.beforeEnter((data) => {
      console.log('●●●●● hooks beforeEnter ●●●●●');
      // console.log(data.next.container);
    });

    barba.hooks.enter((data) => {
      console.log('●●●●● hooks enter ●●●●●');
      // console.log(data.next.container);
    });

    barba.hooks.after((data) => {
      console.log('●●●●● hooks after ●●●●●');
      // console.log(data.next.container);
      enableScrollBody();
      switchDarkMode();
      setFillHeight();
      drawer();
      highlightNav();
      if (data.next.container.querySelector('.js-splitTitle') !== null) {
        data.next.container.querySelectorAll('.js-splitTitle').forEach((el) => {
          new SpanWrapText(el);
        });
      }
      if (data.next.container.querySelector('.swiper') !== null) {
        slider();
      }
    });

    // 初期化
    barba.init({
      sync: true, //trueにするとenterとleaveが同時に処理されるため、asyncで秒数による発火タイミングを制御できる。
      views: [
        //views で有効なのは beforeLeave, afterLeave, beforeEnter, afterEnter のみ。
        // ※transitionと重複しているものはviewsの処理が優先される（transitionの処理は動かない）
        {},
      ],
      transitions: [
        {
          // 全ページ共通の遷移
          name: 'common-transition',
          // ===================================
          // 初回読み込み時の処理
          // ===================================
          once(data) {
            console.log('●●●●● once ●●●●●');
            onceAnimation();
          },
          // ===================================
          // ページを離脱するときの処理（enterと同時発火。awaitの秒数でタイミングを制御）
          // ===================================
          async leave(data) {
            console.log('●●●●● leave ●●●●●');
            const done = this.async();
            leaveAnimation(data);
            await delay(600); //ここの秒数と離脱アニメーションの秒数を揃える
            done();
          },

          beforeEnter({ next }) {
            console.log('●●●●● beforeEnter ●●●●●');
            // headタグを書き換える
            replaceHeadTags(next);
          },

          // ===================================
          // ページを表示するときの処理（leaveと同時発火。awaitの秒数でタイミングを制御））
          // ===================================
          async enter(data) {
            await delay(600);
            console.log('●●●●● enter ●●●●●');
            enterAnimation(data);
          },
        },

        // worksからwork遷移
        // {
        //   name: 'work',
        //   from: {
        //     namespace: 'works',
        //   },
        //   to: {
        //     namespace: 'work',
        //   },
        //   async leave(data) {
        //     console.log('☆☆☆ leave from works to work!');
        //     const done = this.async();
        //     worksLeaveAnimation(data.current.container);
        //     // leaveAnimation(data);
        //     // await delay(600); //ここの秒数と離脱アニメーションの秒数を揃える
        //     await delay(5000); //ここの秒数と離脱アニメーションの秒数を揃える
        //     done();
        //   },
        //   async enter(data) {
        //     console.log('☆☆☆ enter from works to work!');
        //     // await delay(600);
        //     await delay(5000);
        //     // worksEnterAnimation(data.next.container);
        //   },
        // },
      ],
    });
  }
}

export { BarbaTransition };
