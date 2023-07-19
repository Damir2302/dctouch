$(document).ready(function() {

    $('.play-icon').on('click', function() {
        $(this).addClass('hidden')
        $(this).parent().find('.video-img').addClass('hidden')
        $(this).closest('section').addClass('play')
    })

    const slider = new Swiper('.slider .swiper', {
        slidesPerView: 1,
        loop: true,

        navigation: {
            nextEl: '.slider .swiper-button-next',
            prevEl: '.slider .swiper-button-prev',
        },
    })

    if ($(window).width() >= 1200) {
        const pageSlider = new Swiper('#main .swiper', {
            slidesPerView: "auto",
            freeMode: true,
            mousewheel: {
                sensitivity: 2
            },
        })
    }

    $('#openMenu').on('click', function() {
        $(this).closest('#menu').toggleClass('active')
    })

})