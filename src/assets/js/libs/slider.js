export default () => {
  console.log('RUN__sliedr.js');
  const swiper = new Swiper('.swiper', {
    // direction: 'vertical',
    loop: true,
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
    },
  });
};
