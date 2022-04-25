'use strict';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default () => {
  const target = document.querySelector('.js-parallaMouse');
  ScrollTrigger.matchMedia({
    '(min-width: 960px)': function () {
      gsap.config({
        force3D: true,
      });
      document.addEventListener('mousemove', (event) => {
        let yPos = event.clientX / window.innerWidth - 0.5;
        let xPos = event.clientY / window.innerHeight - 0.5;

        gsap.to(target, {
          transformOrigin: 'center center 50%',
          rotateX: xPos * 80,
          rotateY: yPos * -80,
        });
      });
    },
  });
};
