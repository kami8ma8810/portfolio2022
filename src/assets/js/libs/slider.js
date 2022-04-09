export default () => {
  console.log('RUN__sliedr.js');
  let navigationLocked = false;
  let transitionDisabled = false;
  let frameId;

  // アニメーションを中止する
  const disableTransitions = ($el) => {
    $el.addClass('is-no-transition');
    transitionDisabled = true;
    cancelAnimationFrame(frameId); //即時関数
    frameId = requestAnimationFrame(() => {
      $el.removeClass('is-no-transition');
      transitionDisabled = false;
      navigationLocked = false;
    });
  };

  const initNavigation = (swiper) => {
    // デフォルトのnext/prevクラスを使わずにナビゲーションを動作させる
    swiper.$el.find('.p-works-slider__button--next').on('click', () => {
      if (!navigationLocked) {
        swiper.slideNext();
      }
    });

    swiper.$el.find('.p-works-slider__button--prev').on('click', () => {
      if (!navigationLocked) {
        swiper.slidePrev();
      }
    });
  };

  const destroyNavigation = (swiper) => {
    swiper.$el
      .find('.p-works-slider__button--next, .p-works-slider__button--prev')
      .off('click');
    // ↑swiper.off(event, handler)→イベントを削除
  };

  const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: true,
    slidesPerView: 1.1,
    centeredSlides: true,
    spaceBetween: 10,
    // speed: 500,
    breakpoints: {
      // 650: {
      //   slidesPerView: 1.4,
      //   spaceBetween: 20,
      // },
      960: {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
      },
    },
    pagination: {
      el: '.swiper-pagination',
    },
    on: {
      // 遷移時の処理
      transitionStart(swiperEl) {
        const { slides, previousIndex, activeIndex, $el } = swiperEl;
        const $activeSlide = slides.eq(activeIndex); //アクティブのスライド
        const $previousSlide = slides.eq(previousIndex); //1つ前のスライド
        const $previousImageScale = $previousSlide.find(
          '.p-works-slide__imgContainer'
        ); //スライドの画像コンテナ
        const $previousImage = $previousSlide.find('img');
        const $activeImage = $activeSlide.find('img');
        const direction = activeIndex - previousIndex;
        const bgColor = $activeSlide.attr('data-slide-bg-color');
        $el.css('background', bgColor);

        // ---------------PCのみ--------------------
        // $previousImageScale.transform('scale(0.6)');
        // $previousImage.transition(1000).transform('scale(1.2)');
        $previousSlide
          .find('.p-works-slide__inner')
          .transition(500)
          .css('opacity', 0);

        // $previousImage.transitionEnd(() => {
        //   $activeImage
        //     .transition(1300)
        //     .transform('translate3d(0, 0, 0) scale(1.2)');
        //   $previousImage
        //     .transition(1300)
        //     .transform(`translate3d(${60 * direction}%, 0, 0)  scale(1.2)`);
        // });
      },
      // 遷移終了時のアニメーション
      transitionEnd(swiperEl) {
        const { slides, activeIndex, $el } = swiperEl;
        const $activeSlide = slides.eq(activeIndex);
        const $activeImage = $activeSlide.find('img');

        $activeSlide.find('.p-works-slide__imgContainer').transform('scale(1)');
        $activeImage.transition(1000).transform('scale(1)');
        $activeSlide
          .find('.p-works-slide__inner')
          .transition(500)
          .css('opacity', 1);

        $activeImage.transitionEnd(() => {
          navigationLocked = false;
        });
        // First and last, disable button
        // if (activeIndex === 0) {
        //   $el
        //     .find('.p-works-slider__button--prev')
        //     .addClass('p-works-slider__button--disabled');
        // } else {
        //   $el
        //     .find('.p-works-slider__button--prev')
        //     .removeClass('p-works-slider__button--disabled');
        // }

        // if (activeIndex === slides.length - 1) {
        //   $el
        //     .find('.p-works-slider__button--next')
        //     .addClass('p-works-slider__button--disabled');
        // } else {
        //   $el
        //     .find('.p-works-slider__button--next')
        //     .removeClass('p-works-slider__button--disabled');
        // }
      },
      // 初期設定
      init(swiperEl) {
        const { slides, activeIndex, $el } = swiperEl;
        disableTransitions($el);
        const bgColor = slides.eq(activeIndex).attr('data-slide-bg-color');
        $el.css('background-color', bgColor);
        swiperEl.emit('transitionEnd');
        initNavigation(swiperEl);
      },
      // リサイズ時の処理
      resize(swiperEl) {
        disableTransitions(swiperEl.$el);
      },
      // アクティブスライドを削除する
      destroy(swiperEl) {
        destroyNavigation(swiperEl);
      },
    },
  });
};
