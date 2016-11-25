/*
    CAROUSEL.JS - Last updated: 06.10.16
*/
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

;(function($) {
    'use strict';

    //-----------------------------------------------------------------
    // GENERIC CAROUSEL
    //-----------------------------------------------------------------

    function launchHeroCarousel() {
        //var isTablet = $(window).width() > 992;
        var pause = $('.lv-hero-item-carousel').attr('data-pause');

        $('.lv-hero-item-carousel').bxSlider({
            auto: true,
            mode: 'fade', // fade (much have fixed height or won't work)
            adaptiveHeight: true,
            responsive: true,
            touchEnabled: false,
            speed: 2000,
            pause: pause,
            slideMargin: 0,
            slideSelector: ".lv-hero-item-carousel-slide",
            minSlides: 1,
            controls: false,
            nextText: "&#xf105;",
            prevText: "&#xf104;",
            infiniteLoop: true,
            useCSS: true,
            pager: true
        });

    }

    $(document).ready(function() {
        // Multiple slides will trigger the hero carousel
        if ($('.lv-hero-item-carousel-slide').length > 1) launchHeroCarousel();
    });

//--
}(jQuery));

//==================================================
//
//==================================================