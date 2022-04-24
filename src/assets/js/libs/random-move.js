'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default () => {
  const circles = gsap.utils.toArray('.js-moveCircle');
  circles.forEach((el) => {
    ScrollTrigger.matchMedia({
      '(max-width: 959px)': function () {
        gsap.config({
          force3D: 'auto',
        });
        gsap
          .timeline()
          .fromTo(
            el,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              delay: 0.6,
            }
          )
          .to(el, {
            xPercent: 'random(-50, 50)',
            yPercent: 'random(-75, 75)',
            duration: 'random(10, 15)',
            repeat: -1,
            repeatRefresh: true,
          });
      },
      '(min-width: 960px)': function () {
        gsap.config({
          force3D: true,
        });
        gsap
          .timeline()
          .fromTo(
            el,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              delay: 0.6,
            }
          )
          .to(el, {
            xPercent: 'random(-70, 70)',
            yPercent: 'random(-60, 60)',
            duration: 'random(5, 20)',
            repeat: -1,
            repeatRefresh: true,
          });
      },
    });
  });
};
