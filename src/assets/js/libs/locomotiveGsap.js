'use strict';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
import LocomotiveScroll from 'locomotive-scroll';

export default () => {
  // Locomotive/ScrollTriggerの設定
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector('.js-smoothScroll'),
    // multiplier: 0.9, // スクロールの速度（値が小さいほど遅くなる）
    multiplier: 1,
    smooth: true, //PCで慣性スクロール有効

    // スマホの挙動
    smartphone: {
      smooth: false,
    },
    // タブレットの挙動
    tablet: {
      smooth: false,
      breakpoint: 960, //このpx以下までをタブレットとして認識
    },
  });
  // スクロール時にScrollTriggerをアップデートする
  locoScroll.on('scroll', ScrollTrigger.update);

  // Locomotiveがスムースさせる要素を使用しているため、この要素に対してScrollTriggerでスクローラープロキシメソッドを使用。詳細：https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy
  ScrollTrigger.scrollerProxy('.js-smoothScroll', {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  // TOPへ戻るボタン
  // const anchorTop = document.querySelector('#js-pageTop');
  // anchorTop.addEventListener('click', () => {
  //   locoScroll.scrollTo(
  //     'top',
  //     { duration: 400 }, //お好みで調整
  //     { easing: [0.85, 0, 0.15, 1] } //お好みで調整
  //   );
  // });

  //ウィンドウが更新またはリサイズでLocomotiveを更新する
  ScrollTrigger.addEventListener('refresh ', () => locoScroll.update());
  ScrollTrigger.addEventListener('resize', () => locoScroll.update());

  // すべての設定を完了後、ScrolltriggerのpinSpacingによって余分なpaddingが追加されている可能性があるためScrollTriggerをrefreshする
  ScrollTrigger.refresh();
};
