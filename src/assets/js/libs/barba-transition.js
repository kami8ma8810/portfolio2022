'use strict';

import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import gsap from 'gsap';

class BarbaTransition {
  constructor() {
    this._init();
  }
  _init() {
    console.log('RUN__barba-transition.js');

    const bodyEl = document.body;
    const mainEl = document.querySelector('.l-main');

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
        // 'meta[itemprop]',
        // "meta[property^='fb']",
        // 'link[itemprop]',
        // "link[rel='canonical']"
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
      gsap.set(document.body, {
        overflow: 'hidden',
      });
    }
    // bodyスクロール許可
    function enableScrollBody() {
      gsap.set(document.body, {
        overflow: 'auto',
      });
    }
    // mainタグを表示するアニメーション
    function showMain(el) {
      gsap.to(el, {
        opacity: 1,
        delay: 1,
      });
    }

    // アクセス時の処理
    function onceAnimation() {
      gsap.to(mainEl, {
        opacity: 1,
        delay: 0.5,
      });
    }

    // ページが表示されるときのアニメーション（enter）
    function enterAnimation(container) {
      showMain(container.querySelector('.l-main'));
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
    });

    // 初期化
    barba.init({
      sync: true, //trueにするとenterとleaveが同時に処理されるため、asyncでタイミングを設定する。
      views: [
        //views で有効なのは beforeLeave, afterLeave, beforeEnter, afterEnter のみ。
        // ※transitionと重複しているものはviewsの処理が優先される（transitionの処理は動かない）
        {
          // namespace: 'about',
          // beforeEnter(data) {
          //   console.log('beforeEnter on VIEWS!');
          // },
        },
      ],
      transitions: [
        {
          // ===================================
          // 初回読み込み時の処理
          // ===================================
          name: 'common',
          once(data) {
            console.log('●●●●● once ●●●●●');
            onceAnimation();
          },
          // ===================================
          // ページを離脱するときの処理
          // ===================================
          async leave(data) {
            console.log('●●●●● leave ●●●●●');
            const done = this.async();
            await delay(700);
            done();
          },
          // ===================================
          // ページを表示するときの処理
          // ===================================
          beforeEnter({ next }) {
            console.log('●●●●● beforeEnter ●●●●●');
            // headタグを書き換える
            replaceHeadTags(next);
          },
          async enter({ next }) {
            console.log('●●●●● enter ●●●●●');
            await delay(400);
            enterAnimation(next.container);
          },
        },
      ],
    });
  }
}

export { BarbaTransition };
