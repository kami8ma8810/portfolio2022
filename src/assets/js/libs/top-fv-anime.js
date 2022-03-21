import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// TOPページFVアニメーション
export default () => {
  'use strict';
  console.log('RUN__top-fv-anime.js');

  const text01 = document.querySelector('.js-fvText--01');
  const text02 = document.querySelector('.js-fvText--02');
  const text03 = document.querySelector('.js-fvText--03');
  const text04 = document.querySelector('.js-fvText--04');
  const text05 = document.querySelector('.js-fvText--05');
  const text06 = document.querySelector('.js-fvText--06');
  const text07 = document.querySelector('.js-fvText--07');
  const text08 = document.querySelector('.js-fvText--08');
  const text09 = document.querySelector('.js-fvText--09');
  const text10 = document.querySelector('.js-fvText--10');
  const textLast = document.querySelector('.js-fvText--last');
  const textItems = document.querySelectorAll('.topFv__lead');
  const textItemsLg = document.querySelectorAll('.topFv__lead.is-blur');
  const textItemsSm = document.querySelectorAll('.topFv__lead.is-main');

  gsap.config({
    force3D: 'auto',
  });

  const addClassFunc = (el) => {
    el.classList.add('is-active');
  };

  const floating = (item) => {
    gsap.fromTo(
      item,
      {
        y: 0,
      },
      {
        y: 6,
        repeat: -1,
        yoyo: true,
        yoyoEase: 'power2.inOut',
        duration: 2,
      }
    );
  };
  const floatingReverse = (item) => {
    gsap.fromTo(
      item,
      {
        y: 0,
      },
      {
        y: -6,
        repeat: -1,
        yoyo: true,
        yoyoEase: 'power2.inOut',
        duration: 2,
      }
    );
  };
  let tl = gsap.timeline({
    defaults:{
      ease:'sine.out'
    }
  });

  tl.to(text01, {
    keyframes: [
      { delay: 0.8, opacity: 1, duration: 2.1 },
      { scale: 1, duration: 1.2, delay: -2.1 }, // オーバーラップして開始タイミングを合わせる
    ],
    // onStart:()=>{
    //   floating(text01);
    // },
    onComplete: () => {
      // addClassFunc(text01);
      floating(text01);
    },
  })
    .to(
      text02,
      {
        keyframes: [
          { opacity: 1, duration: 2.1 },
          { scale: 1, duration: 1.2, delay: -2.1 },
        ],
        onComplete: () => {
          // addClassFunc(text02);
          floatingReverse(text02);
        },
      },
      '-=1.8'
    )
    .to(
      text03,
      {
        keyframes: [
          { opacity: 1, duration: 2.1 },
          { scale: 1, duration: 1.2, delay: -2.1 },
        ],
        onComplete: () => {
          // addClassFunc(text03);
          floating(text03);
        },
      },
      '-=1.8'
    )
    .to(
      text04,
      {
        keyframes: [
          { opacity: 1, duration: 2.1 },
          { scale: 1, duration: 1.2, delay: -2.1 },
        ],
        onComplete: () => {
          // addClassFunc(text04);
          floatingReverse(text04);
        },
      },
      '-=1.8'
    )
    .to(
      text05,
      {
        keyframes: [
          { opacity: 1, duration: 2.1 },
          { scale: 1, duration: 1.2, delay: -2.1 },
        ],
        onComplete: () => {
          floating(text05);
          // addClassFunc(text05);
        },
      },
      '-=1.8'
    )
    .to(
      text06,
      {
        keyframes: [
          { opacity: 1,ease:'power4.out', duration: 1 },
          { scale: 1, duration: 0.8, delay: -1.4 },
        ],
        onComplete: () => {
          // addClassFunc(text06);
          floating(text06);
        },
      },
      '-=1.4'
    )
    .to(
      text07,
      {
        keyframes: [
          { opacity: 1,ease:'power4.out', duration: 1 },
          { scale: 1, duration: 0.8, delay: -1.4 },
        ],
        onComplete: () => {
          // addClassFunc(text07);
          floatingReverse(text07);
        },
      },
      '-=1.1'
    )
    .to(
      text08,
      {
        keyframes: [
          { opacity: 1,ease:'power4.out', duration: 0.9 },
          { scale: 1, duration: 0.7, delay: -1.3 },
        ],
        onComplete: () => {
          // addClassFunc(text08);
          floating(text08);
        },
      },
      '-=1.1'
    )
    .to(
      text09,
      {
        keyframes: [
          { opacity: 1,ease:'power4.out', duration: 0.85 },
          { scale: 1, duration: 0.7, delay: -1.3 },
        ],
        onComplete: () => {
          floatingReverse(text09);
          // addClassFunc(text09);
        },
      },
      '-=1.1'
    )
    .to(
      text10,
      {
        keyframes: [
          { opacity: 1,ease:'power4.out', duration: 0.8 },
          { scale: 1, duration: 0.6, delay: -1.2 },
        ],
        onComplete: () => {
          // addClassFunc(text10);
          floating(text10);
        },
      },
      '-=1.1'
    )
    .to(
      textLast,
      {
        opacity: 1,
        duration: 0.8,
        ease: 'circ.out',
      },
      '<1'
    );

  // MEMBERSセクションの色替え
  const changeTrigger = document.querySelector('.js-changeTrigger');
  const changeItems = document.querySelectorAll('.js-changeItem');

  ScrollTrigger.create({
    trigger: changeTrigger,
    start: 'top 65%',
    // markers: true,
    toggleClass: { targets: changeItems, className: 'is-changed' },
  });

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
};

// ScrollTrigger.matchMedia({
//   // スマホ用アニメーション
//   '(max-width: 959px)': () => {
//     console.log('RUN__スマホ用 TOP FV ANIME');
//     const tl = gsap.timeline({
//       defaults: {
//         duration: 100,
//         delay: 10,
//       },
//     });
//   },
//   // パソコン用アニメーション
//   '(min-width: 960px)': () => {
//     console.log('RUN__パソコン用 TOP FV ANIME');
//     const tlPc = gsap.timeline({
//       defaults: {
//         duration: 100,
//         delay: 10,
//       },
//     });
//   },
// });
