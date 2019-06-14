/*
    SLIDER.JS - Last updated: 26.03.19

    INFO
        - https://github.com/metafizzy/flickity/issues/922
        - https://stackoverflow.com/questions/55359006/how-do-i-access-the-flickity-instance-on-an-element-initialized-with-html
*/
//-----------------------------------------------------------------
// LAUNCH
//-----------------------------------------------------------------

;(function($){
    'use strict';

    $('[data-slider]').each(function() {

        var $this       = $(this);
        var $slider     = $('[data-flickity]', $this);
        var $prevArrow  = $('.slider-prev-btn', $this);
        var $nextArrow  = $('.slider-next-btn', $this);
        var slideCount  = $slider.children().length;

        if (slideCount > 1) {

            //==================================================
            // ARROWS
            // https://github.com/metafizzy/flickity-docs/issues/5#issuecomment-78370765
            //==================================================

            $prevArrow.on('click', function() {
                $slider.flickity('previous').flickity('stopPlayer');
            });

            $nextArrow.on('click', function() {
                $slider.flickity('next').flickity('stopPlayer');
            });

            //==================================================
            // RE-TRIGGER CSS TRANSITIONS
            //==================================================

            // $slider.on('ready.flickity change.flickity', function() {
                // if ($(window).width() > 576) {
                    // $captions.hide();

                    // setTimeout(function(){
                        // $captions.show();
                    // }, 500);
                // }
            // })
        }
    //--
    });
})(jQuery);

//-----------------------------------------------------------------
//
//-----------------------------------------------------------------
//==================================================
//
//==================================================