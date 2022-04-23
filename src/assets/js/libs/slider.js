import Swiper from 'swiper';

export default () => {
  console.log('RUN__sliedr.js');

  const initNavigation = (swiper) => {
    // デフォルトのnext/prevクラスを使わずにナビゲーションを動作させる
    swiper.$el.find('.p-works-slider__button--next').on('click', () => {
      swiper.slideNext();
    });

    swiper.$el.find('.p-works-slider__button--prev').on('click', () => {
      swiper.slidePrev();
    });
  };

  const swiper = new Swiper('.swiper', {
    // direction: 'vertical',
    loop: true,
    slidesPerView: 1.1,
    centeredSlides: true,
    spaceBetween: 20,
    // speed: 500,
    breakpoints: {
      // 650: {
      //   slidesPerView: 1.4,
      //   spaceBetween: 20,
      // },
      960: {
        // spaceBetween: 10,
        // modules: [Parallax],
        // parallax: true,
        direction: 'horizontal',
        loop: true,
        // slidesPerView: 'auto',
        // slidesPerView: 1,
        slidesPerView: 2.5,
        centeredSlides: true,
        // spaceBetween: 150,
        spaceBetween: 80,
        speed: 500,
      },
    },
    pagination: {
      el: '.swiper-pagination',
    },
    on: {
      // 遷移開始時の処理
      transitionStart(swiperEl) {
        const { slides, previousIndex, activeIndex, $el } = swiperEl;
        const $activeSlide = slides.eq(activeIndex); //アクティブのスライド
        const $previousSlide = slides.eq(previousIndex); //1つ前のスライド
        const bgColor = $activeSlide.attr('data-slide-bg-color');
        $el.css('background', bgColor);
        $previousSlide
          .find('.p-works-slide__inner')
          .transition(200)
          .css('opacity', 0);
        $activeSlide
          .find('.p-works-slide__inner')
          .transition(200)
          .css('opacity', 0);
      },
      // 次nextボタンの処理
      slideNextTransitionStart(swiperEl) {
        const { slides, previousIndex, activeIndex } = swiperEl;
        const $activeSlide = slides.eq(activeIndex); //アクティブのスライド
        const $activeImageScale = $activeSlide.find(
          '.p-works-slide__imgContainer'
        );
        const $previousSlide = slides.eq(previousIndex); //1つ前のスライド
        const $previousImageScale = $previousSlide.find(
          '.p-works-slide__imgContainer'
        );
        $activeImageScale.transition(200).transform('skewX(-10deg)');
        $previousImageScale.transition(200).transform('skewX(-10deg)');
        $previousImageScale.transitionEnd(() => {
          $activeImageScale.transition(200).transform('skewX(0)');
          $previousImageScale.transition(200).transform('skewX(0)');
        });
      },
      // 前prevボタンの処理
      slidePrevTransitionStart(swiperEl) {
        const { slides, previousIndex, activeIndex } = swiperEl;
        const $activeSlide = slides.eq(activeIndex); //アクティブのスライド
        const $activeImageScale = $activeSlide.find(
          '.p-works-slide__imgContainer'
        );
        const $previousSlide = slides.eq(previousIndex); //1つ前のスライド
        const $previousImageScale = $previousSlide.find(
          '.p-works-slide__imgContainer'
        );
        $activeImageScale.transition(200).transform('skewX(10deg)');
        $previousImageScale.transition(200).transform('skewX(10deg)');
        $previousImageScale.transitionEnd(() => {
          $activeImageScale.transition(200).transform('skewX(0)');
          $previousImageScale.transition(200).transform('skewX(0)');
        });
      },
      // 遷移終了時の処理
      transitionEnd(swiperEl) {
        const { slides, activeIndex } = swiperEl;
        const $activeSlide = slides.eq(activeIndex);
        $activeSlide
          .find('.p-works-slide__inner')
          .transition(200)
          .css('opacity', 1);
      },
      // 初期設定
      init(swiperEl) {
        const { slides, previousIndex, activeIndex, $el } = swiperEl;
        const $activeSlide = slides.eq(activeIndex); //アクティブのスライド
        const $activeImageScale = $activeSlide.find(
          '.p-works-slide__imgContainer'
        );
        const bgColor = slides.eq(activeIndex).attr('data-slide-bg-color');
        $activeSlide.find('.p-works-slide__inner').css('opacity', 1);
        $activeImageScale.transform('skewX(0)');
        $el.css('background-color', bgColor);
        swiperEl.emit('transitionEnd');
        initNavigation(swiperEl);
      },
    },
  });
};
