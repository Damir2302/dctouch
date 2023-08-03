$(document).ready(function() {

    // PLAY ICON
    $('.play-icon').on('click', function() {
        $(this).addClass('hidden')
        $(this).parent().find('.video-img').addClass('hidden')
        $(this).closest('section').addClass('play')
    })

    // SWIPER SLIDER
    const slider = new Swiper('.slider .swiper', {
        slidesPerView: 1,
        loop: true,

        navigation: {
            nextEl: '.slider .swiper-button-next',
            prevEl: '.slider .swiper-button-prev',
        },
    })

    // ASIDE MENU
    $('#openMenu').on('click', function() {
        $(this).closest('#menu').toggleClass('active')
    })

    // LOCOMOTIVE SCROLL
    var scroll

    function initScroll() {
        scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            direction: 'horizontal',
            reloadOnContextChange: true,
        })
        console.log('1200')

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

    if ($(window).width() >= 1200) {
        initScroll()
    }

    // function destroyScroll() {
    //     if (scroll) {
    //         scroll.destroy()
    //         scroll = null
    //     }
    // }

    // function toggleScroll() {
    //     const screenWidth = $(window).width();

    //     if (screenWidth >= 1200) {
    //         initScroll()
    //     } else {
    //         destroyScroll()
    //     }
    // }

    // Инициализация плагина при загрузке страницы
    // toggleScroll()

    // CHECK WINDOW WIDTH (MEDIAQUERIES)
    let windowWidth

    if ($(window).width() < 1200) {
        windowWidth = 0
    } else {
        windowWidth = 1
    }

    function checkMediaQueries() {
        if (window.matchMedia('(min-width: 1200px)').matches && windowWidth == 0) {
            windowWidth = 1
            location.reload()
            initScroll()
        } else if (window.matchMedia('(max-width: 1199px)').matches && windowWidth == 1) {
            windowWidth = 0
            location.reload()
        }
    }

    checkMediaQueries()

    // SCROLL TO TOP
    function scrollToTop() {
        if ($(window).width() < 1200) {
            $('#jump-to-menu').on('click', function() {
                $(window).scrollTop(0)
            })
        }
    }
    
    scrollToTop()

    // ON RESIZE EVENT
    window.addEventListener('resize', function() {
        checkMediaQueries(),
        scrollToTop()
    })

})