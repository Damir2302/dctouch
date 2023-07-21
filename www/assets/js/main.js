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

    document.getElementById('jump-to-menu').addEventListener("click", function() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    })

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

    $('#openMenu').on('click', function() {
        $(this).closest('#menu').toggleClass('active')
    })

    if ($(window).width() >= 1200) {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            direction: 'horizontal',
            multiplier: 0.75,
            scrollFromAnywhere: true,
        })
    }

})