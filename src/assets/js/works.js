'use strict';

// スライダー
// import createWorksSlider from './libs/slider';

// vendorsから読み込む外部ファイル
import imagesLoaded from 'imagesloaded';
import slider from './libs/slider';
import createWorksSlider from './libs/works-slider';

// 初期化
document.addEventListener('DOMContentLoaded', function () {
  console.log(
    '---------------------\nDOMContentLoaded in works.js\n---------------------'
  );
  const watchTarget = document.querySelector('.l-wrapper');
  const imgLoad = imagesLoaded(watchTarget, { background: true });
  imgLoad.on('always', () => {
    console.log(
      '---------------------\nDONE__imagesLoaded in works.js\n---------------------'
    );
    // const sliderEl = document.querySelector('.js-slider');
    // createWorksSlider(sliderEl);
    slider();
  });
});
// import createFashionSlider from './fashion-slider';
// import './fashion-slider.scss';
// import './main.scss';
// const sliderEl = document.querySelector('.fashion-slider');
// createFashionSlider(sliderEl);
