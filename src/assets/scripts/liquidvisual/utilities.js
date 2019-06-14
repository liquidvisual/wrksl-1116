/*
    UTILITIES.JS - Last updated: 16.03.16
*/
//-----------------------------------------------------------------
// Utilities
//-----------------------------------------------------------------

;(function($) {
    'use strict';

    //-----------------------------------------------------------------
    // GOOGLE MAP - PREVENT SCROLL TRAP
    //-----------------------------------------------------------------

    var $googleMap = $('.lv-google-map');

    if ($googleMap.length) {

        $googleMap.click(function () {
            $googleMap.find('iframe').css('pointer-events', 'auto');
        });

        $googleMap.mouseleave(function() {
          $googleMap.find('iframe').css('pointer-events', 'none');
        });
    }

    //-----------------------------------------------------------------
    // Loader - to replace NProgress
    //-----------------------------------------------------------------

    // $(window).on('load',function() {
    //     $('[data-page-loader]').addClass('has-loaded');
    // });

}(jQuery));

//==================================================
//
//==================================================

