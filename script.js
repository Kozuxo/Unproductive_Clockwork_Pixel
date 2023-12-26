$(document).ready(function(){
  $('.slick-slider').slick({
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 1,
    variableWidth: true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev">&#10094;</button>',
    nextArrow: '<button type="button" class="slick-next">&#10095;</button>',
  });
});