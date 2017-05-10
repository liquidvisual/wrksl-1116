/*
    MAIN.JS - Last updated: 06.10.16
*/
//-----------------------------------------------------------------
// ON LOAD
//-----------------------------------------------------------------

$(window).on('load', function() {
    $('html').addClass('has-loaded');
    $('input, textarea').placeholder(); // IE9 Patch
});

//-----------------------------------------------------------------
// FORM
//-----------------------------------------------------------------

// https://github.com/1000hz/bootstrap-validator/issues/336
// PROBLEMS WITH MODAL - hot patch
$('#modal-newsletter').on('shown.bs.modal', function () {
    $(this).find('form').validator('destroy').validator()
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

//==============================================
// LAUNCH MANAGE ON KEYPRESS
//==============================================

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

//-----------------------------------------------------------------
// SCROLLTO ANYTHING WITH AN ID
// USAGE:
// pass #id as target - window will scroll to it
//-----------------------------------------------------------------

function scrollTo(id) {
    var href = id;
    var offset = $(window).width() > 540 ? 250 : 0;
    var offsetTop = href === "#" ? 0 : $(href).offset().top - offset;

    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 800);
}

//==================================================
// PLACE ON CLICKS
//==================================================

$('a[href*="#"]:not([href="#"])').click(function(event) {
    // event.preventDefault();
    scrollTo($(this).attr('href'));
});