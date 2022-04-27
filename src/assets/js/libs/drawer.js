// import ua from './ua-parser';
import { gsap } from 'gsap';

export default () => {
  console.log('RUN__drawer.js');
  const drawer = document.getElementById('js-drawer');
  const drawerNav = document.getElementById('js-drawerNav');
  const openButton = document.getElementById('js-openDrawer');
  const closeButton = document.getElementById('js-closeDrawer');
  // const body = document.body;
  // const header = document.querySelector('.l-header');
  const drawerItems = document.querySelectorAll('.js-drawerItem');
  const hamburger = document.querySelector('.c-hamburger');
  const hamburgerInner = document.querySelector('.c-hamburger__inner');

  // スクロールバーの幅を取得
  // const scrollbarWidth = window.innerWidth - body.clientWidth;

  // 現在の状態（開いていたらtrue）
  let drawerOpen = false;

  // stateは真偽値
  function changeAriaExpanded(state) {
    const value = state ? 'true' : 'false';
    drawer.setAttribute('aria-expanded', value);
    openButton.setAttribute('aria-expanded', value);
    closeButton.setAttribute('aria-expanded', value);
  }

  // stateは真偽値
  function changeState(state) {
    if (state === drawerOpen) {
      console.log('2回以上連続で同じ状態に変更しようとしました');
      return;
    }
    changeAriaExpanded(state);
    drawerOpen = state;
  }
  gsap.config({
    force3D: 'auto',
    nullTargetWarn: false,
    trialWarn: false,
  });

  function openDrawer() {
    gsap.set('.js-drawerItem a', { yPercent: 101 });
    gsap.set('.l-drawer__close', {
      opacity: 0,
    });
    const tl = gsap.timeline({
      // onStart: () => {
      //   body.style.overflowY = 'hidden'; //ドロワーを開いている間はメインコンテンツをスクロール不可にする
      // },
      onComplete: () => {
        changeState(true);
        drawerNav.setAttribute('aria-hidden', false);
        //   //PCのみスクロールバーのガタつきをなくすためにヘッダーにpadding-right設定
        //   if (ua.getDevice() == 'pc') {
        //     header.style.paddingRight = `${scrollbarWidth}px`;
        //     header.style.backgroundColor = '#fff';
        //   }
      },
    });
    tl.to(hamburger, {
      keyframes: [
        {
          scale: 0.8,
          duration: 0.1,
        },
        {
          scale: 1,
          duration: 0.1,
        },
      ],
    })
      .to(hamburgerInner, {
        opacity: 0,
        duration: 0.2,
      })
      .to(
        hamburger,
        {
          backgroundColor: '#316745',
          // border: 0,
          duration: 0.2,
        },
        '<'
      )
      .to(hamburger, {
        scale: 50,
        ease: 'circ.inOut',
        duration: 0.4,
      })
      .to(drawer, {
        visibility: 'visible',
        opacity: 1,
        duration: 0.01,
      })
      .to(drawerItems, {
        yPercent: 0,
        stagger: { amount: 0.3 },
      })
      .to(
        '.l-drawer__close',
        {
          opacity: 1,
        },
        '-=.1'
      );
  }

  function closeDrawer() {
    const tl = gsap.timeline({
      defaults: {
        ease: 'circ.inOut',
      },
      // onStart: () => {
      //   body.style.overflowY = ''; //メインコンテンツをスクロール不可を解除する
      // },
      onComplete: () => {
        changeState(false);
        drawerNav.setAttribute('aria-hidden', true);
        // if (ua.getDevice() == 'pc') {
        //   header.style.paddingRight = ''; //PCのみヘッダーのpadding-right削除
        //   header.style.backgroundColor = '';
        // }
      },
    });
    tl.to(closeButton, {
      keyframes: [
        {
          scale: 0.5,
          duration: 0.1,
        },
        {
          scale: 1,
          duration: 0.1,
        },
      ],
    })
      .to(drawer, {
        keyframes: [
          {
            opacity: 0,
            duration: 0.2,
          },
          {
            visibility: 'hidden',
            duration: 0.01,
          },
        ],
      })
      .to(hamburger, {
        scale: 1,
        duration: 0.6,
      })
      .to(hamburger, {
        backgroundColor: 'transparent',
        duration: 0.2,
      })
      .to(
        hamburgerInner,
        {
          opacity: 1,
          duration: 0.2,
        },
        '<'
      );
  }

  function onClickOpenButton() {
    openDrawer();
  }

  function onClickCloseButton() {
    closeDrawer();
  }

  openButton.addEventListener('click', onClickOpenButton, false);
  closeButton.addEventListener('click', onClickCloseButton, false);
};
