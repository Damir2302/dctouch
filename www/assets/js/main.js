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
        })

        scroll.tablet.breakpoint = 1200

        scroll.on('scroll', function({scroll}) {

            if (scroll.x > 0.6 ) {
                $('#arrow').fadeOut()
            } else {
                $('#arrow').fadeIn()
            }

            if (scroll.x < 80) {
                $('#jump-to-menu').removeClass('fixed')
            } else {
                $('#jump-to-menu').addClass('fixed')
            }
        })

        scroll.update()

        $('#jump-to-menu').on('click', function() {
            scroll.scrollTo(0, 0)
        })

        $('.js-anchor').on('click', function(e) {
            e.preventDefault()

            let targetElement
            targetElement = document.querySelector(`${e.target.getAttribute('href')}`)

            const targetOffset = targetElement.offsetLeft;
            const targetWidth = targetElement.offsetWidth;
            const windowWidth = window.innerWidth;

            scroll.scrollTo(targetOffset - (windowWidth / 2) + (targetWidth / 2))
        })
    }

    function destroyScroll() {
        if (scroll) {
            scroll.destroy()
            scroll = null
        }
    }

    function toggleScroll() {
        const screenWidth = $(window).width();

        if (screenWidth >= 1200) {
            initScroll()
        } else {
            destroyScroll()
        }
    }

    // Инициализация плагина при загрузке страницы
    toggleScroll()

    // Включение или отключение плагина при изменении размера экрана
    window.addEventListener('resize', toggleScroll)

    function scrollToTop() {
        if ($(window).width() < 1200) {
            $('#jump-to-menu').on('click', function() {
                $(window).scrollTop(0)
            })
        }
    }

    scrollToTop()

    $(window).on('resize', function() {
        scrollToTop()
    })

})