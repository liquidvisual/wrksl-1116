/*
    OFF-CANVAS.JS - Last updated: 06.10.16
*/
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

;(function($) {
    'use strict';

    //-----------------------------------------------------------------
    // VARIABLES
    //-----------------------------------------------------------------

    var intervalId;
    var $html = $('html');
    var $globalHeader = $('.global-header');
    var $dropdowns = $('.lv-off-canvas .dropdown');
    var $lvPage = $('.lv-page');
    var $lvOffCanvas = $('.lv-off-canvas');
    var $submenuTrigger = $('<span class="submenu-trigger"><i class="fa fa-angle-right"></i></span>');

    //-----------------------------------------------------------------
    // INIT
    //-----------------------------------------------------------------

    $('.lv-off-canvas .has-dropdown > a').append($submenuTrigger);

    //-----------------------------------------------------------------
    // HAMBURGER CLICK
    //-----------------------------------------------------------------

    $('[data-menu-toggle]').click(function(){

        var menuIsOpen = $('.has-open-menu').length;

        //==================================================
        // OPEN MENU
        //==================================================

        if (!menuIsOpen) {
            $html.removeClass('has-closed-menu').addClass('has-open-menu');
            pollFixedTop();

        //==================================================
        // CLOSE MENU
        //==================================================

        } else {
            $globalHeader.removeAttr('style');
            clearInterval(intervalId);
            $html.removeClass('has-open-menu').addClass('has-closed-menu');
        }
    });

    //-----------------------------------------------------------------
    // SUBMENU CLICK
    //-----------------------------------------------------------------

    $submenuTrigger.click(function(event){
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().next('.dropdown').addClass('is-open');
    });

    //-----------------------------------------------------------------
    // DROPDOWN CLICK (EXIT BACK)
    //-----------------------------------------------------------------

    $dropdowns.click(function(event){
        $(this).removeClass('is-open');
        event.stopPropagation();
    });

    //-----------------------------------------------------------------
    // POLL FIXED-TOP UNTIL CLOSE
    //-----------------------------------------------------------------

    function pollFixedTop() {
        intervalId = setInterval(function(){
            if ($('.has-open-menu').length) {

                $('.global-header').css({ top: $(window).scrollTop()+'px' });
            } else {
                $('.global-header').removeAttr('style');
                clearInterval(intervalId);
            }
        }, 100);
    }
//--
}(jQuery));

//==================================================
//
//==================================================