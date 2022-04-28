import { gsap } from 'gsap';

export default () => {
  const loadingLayer = document.querySelector('.js-loading');
  const loadingText = document.querySelector('.js-loadingText');
  const loadinLogo = document.querySelector('.js-loadingLogo');
  const loadingFaces = document.querySelectorAll('.js-loadingFace');
  const faceArray = gsap.utils.toArray(loadingFaces);

  const face1 = faceArray[0];
  const face2 = faceArray[1];
  const face3 = faceArray[2];

  if (loadingLayer !== null) {
    const clipStart = () => {
      loadingLayer.classList.add('is-done');
      gsap.to(loadingLayer, {
        autoAlpha: 0,
        display: 'none',
        delay: 1.2,
      });
    };

    const tl = gsap.timeline({
      onComplete: () => {
        clipStart();
      },
    });
    tl.to(loadingText, {
      autoAlpha: 0,
      duration: 0.4,
      delay: 2,
      // delay: 10000,
    })
      .to(face1, {
        keyframes: [
          {
            scale: 3,
            rotate: 550,
            duration: 0.8,
            backgroundColor: 'rgb(240,0,0)',
          },
          {
            rotate: 910,
            borderRadius: '50%',
            scale: 1,
            duration: 1.2,
            yPercent: -25,
            ease: 'back.out(1.2)',
          },
        ],
      })
      .to(
        face2,
        {
          keyframes: [
            {
              scale: 3,
              rotate: 550,
              duration: 0.8,
              backgroundColor: 'rgb(0,240,0)',
            },
            {
              rotate: 910,
              borderRadius: '50%',
              scale: 1,
              duration: 1.2,
              xPercent: -25,
              yPercent: 25,
              ease: 'back.out(1.2)',
            },
          ],
        },

        '<.6'
      )
      .to(
        face3,
        {
          keyframes: [
            {
              scale: 3,
              rotate: 550,
              duration: 0.8,
              backgroundColor: 'rgb(0,0,240)',
            },
            {
              rotate: 910,
              borderRadius: '50%',
              scale: 1,
              duration: 1.2,
              xPercent: 25,
              yPercent: 25,
              ease: 'back.out(1.2)',
            },
          ],
        },
        '<.4'
      )
      .to(loadingFaces, {
        xPercent: 0,
        yPercent: 0,
        duration: 0.6,
        opacity: 0,
        scale: 0,
        ease: 'back.inOut(1.5)',
      })
      .to(
        loadinLogo,
        {
          duration: 0.6,
          opacity: 1,
          scale: 1,
          ease: 'back.out(1.5)',
        },
        '<.4'
      );
  }
};
