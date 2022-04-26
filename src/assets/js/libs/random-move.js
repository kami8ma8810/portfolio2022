'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default () => {
  const circles = gsap.utils.toArray('.js-moveCircle');
  circles.forEach((el) => {
    // 円の動き
    const loopMove = () => {
      let dur = gsap.utils.random(5, 10);
      const tl = gsap.timeline({ onComplete: loopMove });

      tl.to(el, {
        xPercent: 'random(-50, 50)',
        yPercent: 'random(-50, 50)',
        scale: 'random(0.5, 1.5)',
        duration: dur,
        ease: 'sine.inOut',
        transformOrigin: '50% 50%',
        repeat: 1,
        yoyo: true,
      });
    };

    ScrollTrigger.matchMedia({
      // SP---------------------------------
      '(max-width: 959px)': function () {
        gsap.config({
          force3D: 'auto',
        });
        gsap
          .timeline({
            onComplete: () => {
              loopMove();
            },
          })
          .fromTo(
            el,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              delay: 0.6,
              ease: 'back.out(1.5)',
            }
          );
      },
      // PC---------------------------------
      '(min-width: 960px)': function () {
        gsap.config({
          force3D: true,
        });
        gsap
          .timeline({
            onComplete: () => {
              loopMove();
            },
          })
          .fromTo(
            el,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              delay: 0.6,
              ease: 'back.out(2)',
            }
          );
      },
    });
  });
};

// refreshの書き方（途中ラグが出るので無し
//  // SP---------------------------------
//  '(max-width: 959px)': function () {
//   function movingSp() {
//     gsap.to(el, {
//       xPercent: 'random(-50, 50)',
//       yPercent: 'random(-65, 65)',
//       duration: 'random(5, 10)',
//       ease: 'power3.inOut',
//       repeat: -1,
//       repeatRefresh: true,
//     });
//   }
//   gsap.config({
//     force3D: 'auto',
//   });
//   gsap
//     .timeline({
//       onComplete: () => {
//         movingSp();
//       },
//     })
//     .fromTo(
//       el,
//       { scale: 0 },
//       {
//         scale: 1,
//         duration: 0.4,
//         delay: 0.6,
//         ease: 'back.out(1.5)',
//       }
//     );
// },
