/*
    MAIN.JS - Last updated: 06.10.16
*/
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

$(function() {

    //-----------------------------------------------------------------
    // WINDOW LOAD
    //-----------------------------------------------------------------

    $(window).on('load', function() {
        $('html').addClass('has-loaded');
        $('input, textarea').placeholder(); // IE9 Patch
    });

    //-----------------------------------------------------------------
    // EQUAL HEIGHT
    //-----------------------------------------------------------------

    if ($('.lt-ie10').length) {
        $('[data-equal-height]').matchHeight(
         {
             byRow: false,
             property: 'height',
             target: null,
             remove: false
         });
    } else {
        $('[data-equal-height]').matchHeight(
         {
             byRow: false,
             property: 'height',
             target: null,
             remove: false,
             mq: "(min-width: 768px)"
         });
    }

    //-----------------------------------------------------------------
    // IMAGE MAP RESZIER
    //-----------------------------------------------------------------

    $('#aus-map').imageMapResize();

    //-----------------------------------------------------------------
    // SITEMAP TRIGGER
    //-----------------------------------------------------------------

    $('[data-sitemap-trigger]').click(function(event){
        $('.fa', $(this)).toggleClass('fa-angle-down');
        $('[data-sitemap]').toggleClass('is-collapsed');
    });

    //-----------------------------------------------------------------
    // SEARCH TRIGGER
    //-----------------------------------------------------------------

    $('[data-search-trigger]').click(function(event){

        var $search = $('[data-search]');
        //var searchIsHidden = $search.hasClass('is-hidden');

        $search.removeClass('is-hidden');

        $(document).on('scroll', function(){
            $search.addClass('is-hidden');
            // automatically close the keyboard on iOS
            document.activeElement.blur();
        });
    });

    $('[data-search] .close').on('click', function(){
        $('[data-search]').addClass('is-hidden');
        // automatically close the keyboard on iOS
        document.activeElement.blur();
    });

    //-----------------------------------------------------------------
    // LAUNCH MANAGE ON KEYPRESS
    //-----------------------------------------------------------------

    key('⌘+shift+m, ctrl+shift+m', function(){
      window.location = '/manage/';
    });

    //-----------------------------------------------------------------
    // SCROLL TO
    //-----------------------------------------------------------------

    $('a[href*="#"]:not([href="#"]):not(.accordion a)').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 800);
                return false;
            }
        }
    });

    //-----------------------------------------------------------------
    // HEADROOM.js
    //-----------------------------------------------------------------

    $(".global-header").headroom({
        // vertical offset in px before element is first unpinned
        offset : 60,
        // scroll tolerance in px before state changes
        tolerance : 0,
        // or you can specify tolerance individually for up/down scroll
        tolerance : {
            up : 5,
            down : 0
        },
        // css classes to apply
        classes : {
            // when element is initialised
            initial : "headroom",
            // when scrolling up
            pinned : "headroom--pinned",
            // when scrolling down
            unpinned : "headroom--unpinned",
            // when above offset
            top : "headroom--top",
            // when below offset
            notTop : "headroom--not-top",
            // when at bottom of scoll area
            bottom : "headroom--bottom",
            // when not at bottom of scroll area
            notBottom : "headroom--not-bottom"
        },
        // element to listen to scroll events on, defaults to `window`
        // scroller : someElement,
        // callback when pinned, `this` is headroom object
        onPin : function() {},
        // callback when unpinned, `this` is headroom object
        onUnpin : function() {},
        // callback when above offset, `this` is headroom object
        onTop : function() {},
        // callback when below offset, `this` is headroom object
        onNotTop : function() {},
        // callback when at bottom of page, `this` is headroom object
        onBottom : function() {},
        // callback when moving away from bottom of page, `this` is headroom object
        onNotBottom : function() {}
    });

//--
});

//-----------------------------------------------------------------
// ACCORDION - USED IN LOCATIONS
//-----------------------------------------------------------------

$('[data-accordion-trigger] a').on('click', function(event){
    var $this = $(this);
    var id = $this.attr('href');
    var isOpen = $this.hasClass('active');

    if ($(window).width > 540) event.preventDefault();

    if (isOpen) {
        $('[data-accordion-trigger] a').removeClass('active');
        $('[data-accordion]').removeClass('active');
    } else {
        // remove all active classes
        $('[data-accordion-trigger] a').removeClass('active');
        $this.addClass('active');
        $('[data-accordion]').removeClass('active');
        $(id).addClass('active');
    }
});

//==================================================
//
//==================================================