'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default () => {
  const circles = gsap.utils.toArray('.js-moveCircle');
  circles.forEach((el) => {
    ScrollTrigger.matchMedia({
      // SP---------------------------------
      '(max-width: 959px)': function () {
        function movingSp() {
          gsap.to(el, {
            xPercent: 'random(-50, 50)',
            yPercent: 'random(-65, 65)',
            duration: 'random(5, 10)',
            ease: 'power3.inOut',
            repeat: -1,
            repeatRefresh: true,
          });
        }
        gsap.config({
          force3D: 'auto',
        });
        gsap
          .timeline({
            onComplete: () => {
              movingSp();
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
        function moving() {
          gsap.to(el, {
            xPercent: 'random(-60, 60)',
            yPercent: 'random(-60, 60)',
            duration: 'random(10, 20)',
            ease: 'power3.inOut',
            repeat: -1,
            repeatRefresh: true,
          });
        }
        gsap.config({
          force3D: true,
        });
        gsap
          .timeline({
            onComplete: () => {
              moving();
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
