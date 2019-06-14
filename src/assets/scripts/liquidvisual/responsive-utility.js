/*
    RESPONSIVE-UTILITY.JS - Last updated: 23.08.18

    - Notes: Needs refactor (Vue possibly?)
*/
//-----------------------------------------------------------------
// Responsive Utility
//-----------------------------------------------------------------

;(function($) {
    'use strict';

    //-----------------------------------------------------------------
    // Variables
    //-----------------------------------------------------------------

    var breakpoints = {};
    var temporaryArray = ['xs','sm','md','lg','xl', 'xxl'];

    //-----------------------------------------------------------------
    // Draw Responsive Table
    // Use meta data stored on the body by Sass
    //-----------------------------------------------------------------

    function getBreakpoints() {

        var $tableElement;
        var tableString = '';
        var bodyMetaString = window.getComputedStyle(document.getElementsByTagName("body")[0]).getPropertyValue('content');
        var breakpointsArray = (bodyMetaString.replace(/\\a/g, "").replace(/ /g,'')).replace(/'/g, '').replace(/"/g, '').split('|');

        //==================================================
        // Create breakpoints object from meta on body
        //
        // Example:
        // obj = { xs: 0, sm: 540 }
        //==================================================

        for (var i = 0; i < breakpointsArray.length; i++) {

            // Create object to be used with responsive display
            breakpoints[temporaryArray[i]] = Number(breakpointsArray[i].replace('px', ''));

            // Populate table string
            var tableRow = '<tr><td>'+temporaryArray[i]+'</td><td>'+breakpointsArray[i]+'</td></tr>';
            tableString += tableRow;
        }

        //==================================================
        // Output to DOM
        //==================================================

        $tableElement = '<table class="table breakpoints-table" style="width: 300px;">'+tableString+'</table>';
        $('[data-js="lv-responsive-table"]').append($tableElement);

        // console.log(breakpoints);
    };

    getBreakpoints();

    //-----------------------------------------------------------------
    // Display Responsive Helper
    //-----------------------------------------------------------------

    function responsiveHelper() {
        var $body = $('body');

        if ($('.lv-screen-data').length != 1) {
            $body.append('<div class="lv-screen-data"></div>');
        }
        var screenWidth = window.innerWidth; // NEW - chrome, firefox, opera
        var screenHeight = window.innerHeight;

        var queryWidth = $(window).width(); // old
        var queryHeight = $(window).height();

        var chromeScreen;
        var safariScreen; // what a pathetic piece of shit

        if (screenWidth < breakpoints.sm) chromeScreen = "xs";
        if (screenWidth >= breakpoints.sm && screenWidth < breakpoints.md) chromeScreen = "sm";
        if (screenWidth >= breakpoints.md && screenWidth < breakpoints.lg) chromeScreen = "md";
        if (screenWidth >= breakpoints.lg && screenWidth < breakpoints.xl) chromeScreen = "lg";
        if (screenWidth >= breakpoints.xl && screenWidth < breakpoints.xxl) chromeScreen = "xl";
        if (screenWidth >= breakpoints.xxl) chromeScreen = "xxl";

        if (queryWidth < breakpoints.sm) safariScreen = "xs";
        if (queryWidth >= breakpoints.sm && queryWidth < breakpoints.md) safariScreen = "sm";
        if (queryWidth >= breakpoints.md && queryWidth < breakpoints.lg) safariScreen = "md";
        if (queryWidth >= breakpoints.lg && queryWidth < breakpoints.xl) safariScreen = "lg";
        if (queryWidth >= breakpoints.xl && queryWidth < breakpoints.xxl) safariScreen = "xl";
        if (queryWidth >= breakpoints.xxl) safariScreen = "xxl";

        $('.lv-screen-data').html(queryWidth+" x "+queryHeight+"<br><small>"+screenWidth+" x "+screenHeight+"</small><br>"+chromeScreen+"  ["+safariScreen+"]")
            .css({
                'position': 'fixed',
                'top': 0,
                'padding': '5px 10px',
                'background': 'rgba(0,0,0,0.5)',
                'font-family': 'Helvetica Neue',
                'font-size': '14px',
                'color': 'white',
                'z-index': 2147483646,
            })
            .click(function(){
                $body.toggleClass('developer');
            });
    }

    //-----------------------------------------------------------------
    // Display if body has 'dev-mode' attribute
    //-----------------------------------------------------------------

    if ($('html[development]').length) {

        // Launch it
        responsiveHelper();

        // Resize
        $(window).resize(function(){
            responsiveHelper();
        });
    }
}(jQuery));

//==================================================
//
//==================================================