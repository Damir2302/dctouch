$(document).ready(function() {

    // let anchors = document.querySelectorAll('.js-anchor')
    // if (anchors.length > 0) {
    //     anchors.forEach(anchor => {
    //         anchor.onclick = function (e) {
    //             e.preventDefault();
    //             document.querySelector(`#${anchor.href.split('#')[1]}`).scrollIntoView({
    //                 block: 'nearest',
    //                 behavior: 'smooth',
    //             })
    //         }
    //     })
    // }

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

    var scroll

    function initScroll() {
        scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            direction: 'horizontal',
            reloadOnContextChange: true,
        });
    }

    function destroyScroll() {
        if (scroll) {
            scroll.destroy();
            scroll = null;
        }
    }

    function toggleScroll() {
        const screenWidth = $(window).width();

        if (screenWidth >= 1200) {
            initScroll();
        } else {
            destroyScroll();
        }
    }

    // Инициализация плагина при загрузке страницы
    toggleScroll()

    // Включение или отключение плагина при изменении размера экрана
    window.addEventListener('resize', toggleScroll);

    $('.js-anchor').on('click', function(e) {
        e.preventDefault()
        scroll.scrollTo(document.querySelector('#form'))
    })

})