$('.menu__btn').on('click',function(e) {
    e.preventDefault;
    $(this).toggleClass('menu__btn-active');
    $('.menu__nav-list').toggleClass('menu__nav--active');
});