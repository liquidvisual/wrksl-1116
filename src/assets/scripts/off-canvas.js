/*
    OFF-CANVAS.JS - Last updated: 13.02.19, 17.09.18, 16.04.18, 13.12.16

    - NOTES:

    * 2019 versions delays window.location to finish animation
    * Latest Nov version fixes major problem with 3rd lvls
    * off-canvas closes when clicking hash tag anchor
*/
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

;(function($) {
    'use strict';

    //-----------------------------------------------------------------
    // VARIABLES
    //-----------------------------------------------------------------

    var $html = $('html');
    var $lvPage = $('.lv-page');
    var $lvOffCanvas = $('.lv-off-canvas');
    var $dropdowns = $('.dropdown', $lvOffCanvas);
    // var $hashAnchor = $('a[href*="#"]:not([href="#"])', $lvOffCanvas);
    var $anchors = $('li:not(.has-dropdown) > a', $dropdowns);
    var $submenuTrigger = $('.submenu-arrow');

    //-----------------------------------------------------------------
    // HAMBURGER CLICK
    //-----------------------------------------------------------------

    $('[data-menu-toggle]').on('click', function(event){

        event.preventDefault();
        $html.toggleClass('has-open-menu');
    });

    //-----------------------------------------------------------------
    // HASH ANCHOR CLICK - NEW -
    //-----------------------------------------------------------------

    // $hashAnchor.on('click', function(event){
    //     event.preventDefault();
    //     event.stopPropagation();
    //     $html.removeClass('has-open-menu').addClass('has-closed-menu');
    //     $lvPage.unbind('click');
    // });

    //-----------------------------------------------------------------
    // SUBMENU CLICK
    //-----------------------------------------------------------------

    $submenuTrigger.on('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().next('.dropdown').addClass('is-open');
    });

    //-----------------------------------------------------------------
    // ANCHORS (smoother experience)
    //-----------------------------------------------------------------

    $anchors.click(function(event) {
        event.preventDefault();
            var path = $(this).attr('href');
            $html.removeClass('has-open-menu').addClass('has-closed-menu');

            setTimeout(function() {
                window.location = path;
            }.bind(path), 200);
    });

    //-----------------------------------------------------------------
    // DROPDOWN CLICK (EXIT BACK)
    //-----------------------------------------------------------------

    $dropdowns.on('click', function(event){
        $(this).removeClass('is-open');
        event.stopPropagation();
    });

//--
}(jQuery));

//==================================================
//
//==================================================