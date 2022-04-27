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
        // let xPos = event.clientY / window.innerHeight - 0.5;
        let xPos = window.innerWidth - event.clientX * 2;
        // let yPos = event.clientX / window.innerWidth - 0.5;
        let yPos = window.innerHeight - event.clientY * 2;

        gsap.to(target, {
          transformOrigin: 'center center 50%',
          // rotateX: xPos * 80,
          // rotateY: yPos * -80,
          rotateX: yPos / 30,
          rotateY: -xPos / 24,
          boxShadow: `${yPos} ${xPos} 4px rgba(0, 0, 0, 1)`,
          // ease: 'power2.out',
        });
      });
    },
  });
};
