$(document).ready(function() {

    let anchors = document.querySelectorAll('.js-anchor')
    if (anchors.length > 0) {
        anchors.forEach(anchor => {
            anchor.onclick = function (e) {
                e.preventDefault();
                document.querySelector(`#${anchor.href.split('#')[1]}`).scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth',
                })
            }
        })
    }

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
        const pageSlider = new Swiper('.main-swiper', {
            slidesPerView: "auto",
            freeMode: true,
            mousewheel: {
                sensitivity: 5
            },
            keyboard: {
                enabled: true,
                onlyInViewport: false
            }
        })
    }

    $('#openMenu').on('click', function() {
        $(this).closest('#menu').toggleClass('active')
    })

})