'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  console.log('RUN+++suji.js');
  // カウンタアップのトリガーと要素
  const counterTrigger01 = document.querySelector('.js-trigger01');
  const counterItem01 = document.querySelectorAll('.js-counter01');
  const counterTrigger02 = document.querySelector('.js-trigger02');
  const counterItem02 = document.querySelectorAll('.js-counter02');
  const counterTrigger03 = document.querySelector('.js-trigger03');
  const counterItem03 = document.querySelectorAll('.js-counter03');
  const counterTrigger04 = document.querySelector('.js-trigger04');
  const counterItem04 = document.querySelectorAll('.js-counter04');

  // 中途入社比率
  const counterTrigger05 = document.querySelector('.js-trigger05');
  const counterItem05 = document.querySelectorAll('.js-counter05');
  // 複数事業
  const counterTrigger06 = document.querySelector('.js-trigger06');
  const counterItem06 = document.querySelectorAll('.js-counter06');

  // 事業展開国数＆展開事業数
  const counterTrigger07 = document.querySelector('.js-trigger07');
  const counterItem07 = document.querySelectorAll('.js-counter07');

  // カウントアップ処理
  function countUp(el, sec = 1.2) {
    gsap.from(el, {
      textContent: 0,
      duration: sec,
      snap: { textContent: 1 },
      ease: 'power4.out',
    });
  }

  // -------------------------------------------------
  // Chart.js設定
  // -------------------------------------------------
  const ctx1 = document.getElementById('pieChart01').getContext('2d');
  const ctx2 = document.getElementById('pieChart02').getContext('2d');
  const ctx3 = document.getElementById('pieChart03').getContext('2d');
  const ctx4 = document.getElementById('pieChart04').getContext('2d');
  const pieGraph = document.querySelector('.js-pie').getContext('2d');

  let circleEndPointX = pieGraph.canvas.clientWidth;
  let circleEndPointY = pieGraph.canvas.clientHeight;

  // YESの色（グラデーションの設定）
  let colorGradient = pieGraph.createLinearGradient(
    0,
    0,
    circleEndPointX,
    -circleEndPointY
  );
  colorGradient.addColorStop(0, '#ff9933'); //濃いオレンジ
  colorGradient.addColorStop(1, '#ffbd7e'); //薄いオレンジ
  // NOの色
  const colorNo = '#EBD99B';

  // グラフの内容
  const circleConfigs = [
    // アンケート１
    {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [98, 2],
            borderWidth: 0,
            backgroundColor: [colorGradient, colorNo],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false, //ホバーorタップで数値を表示するかどうか
          },
        },
      },
    },
    // アンケート２
    {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [97, 3],
            borderWidth: 0,
            backgroundColor: [colorGradient, colorNo],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false, //ホバーorタップで数値を表示するかどうか
          },
        },
      },
    },
    // アンケート３
    {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [100, 0],
            borderWidth: 0,
            backgroundColor: [colorGradient, colorNo],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false, //ホバーorタップで数値を表示するかどうか
          },
        },
      },
    },
    // アンケート４
    {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [96, 4],
            borderWidth: 0,
            backgroundColor: [colorGradient, colorNo],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false, //ホバーorタップで数値を表示するかどうか
          },
        },
      },
    },
  ];

  // --------------------------------------------------------------
  // トリガーが見えたらカウントアップ処理とグラフ描画処理をスタート
  // --------------------------------------------------------------
  const drawChartCountUp = () => {
    ScrollTrigger.create({
      trigger: counterTrigger01,
      start: 'top 80%',
      // markers: true,
      once: true,
      onEnter: () => {
        gsap.to(counterTrigger01, {
          opacity: 1,
          duration: 0.2,
        });
        countUp(counterItem01);
        const mychart1 = new Chart(ctx1, circleConfigs[0]);
      },
    });
    ScrollTrigger.create({
      trigger: counterTrigger02,
      start: 'top 80%',
      // markers: true,
      once: true,
      onEnter: () => {
        gsap.to(counterTrigger02, {
          opacity: 1,
          duration: 0.2,
        });
        countUp(counterItem02);
        const mychart2 = new Chart(ctx2, circleConfigs[1]);
      },
    });
    ScrollTrigger.create({
      trigger: counterTrigger03,
      start: 'top 80%',
      // markers: true,
      once: true,
      onEnter: () => {
        gsap.to(counterTrigger03, {
          opacity: 1,
          duration: 0.2,
        });
        countUp(counterItem03);
        const mychart3 = new Chart(ctx3, circleConfigs[2]);
      },
    });
    ScrollTrigger.create({
      trigger: counterTrigger04,
      start: 'top 80%',
      // markers: true,
      once: true,
      onEnter: () => {
        gsap.to(counterTrigger04, {
          opacity: 1,
          duration: 0.2,
        });
        countUp(counterItem04);
        const mychart4 = new Chart(ctx4, circleConfigs[3]);
      },
    });
    ScrollTrigger.create({
      trigger: counterTrigger05,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(counterTrigger05, {
          opacity: 1,
          duration: 0.2,
        });
        countUp(counterItem05, 0.8);
      },
    });
    ScrollTrigger.create({
      trigger: counterTrigger06,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(counterTrigger06, {
          opacity: 1,
          duration: 0.2,
        });
        countUp(counterItem06, 0.8);
      },
    });
    ScrollTrigger.create({
      trigger: counterTrigger07,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(counterItem07, {
          opacity: 1,
          duration: 0.2,
        });
        countUp(counterItem07, 1.5);
      },
    });
  };

  // iphoneXなど縦長用にロード時に実行させないでスクロール開始してから実行させる
  ScrollTrigger.create({
    trigger: document.body,
    start: '1px top',
    end: document.body.innerHeight,
    once: true,
    onEnter: () => {
      drawChartCountUp();
    },
  });

  // リサイズでスクロールトリガーをリセット
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
});
