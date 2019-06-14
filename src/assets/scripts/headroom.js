/*
    MAIN.JS - Last updated: 27.03.19
*/

;(function() {
    'use strict';

    //-----------------------------------------------------------------
    // VARIABLES
    //-----------------------------------------------------------------

    var lvPage = document.querySelector(".lv-page");
    var headroom = null;
    var resizeTimer;

    //-----------------------------------------------------------------
    // ON LOAD
    //-----------------------------------------------------------------

    window.addEventListener('load', initHeadroom);
    window.addEventListener('resize', onResize);

    //-----------------------------------------------------------------
    // HEADROOM.js
    //-----------------------------------------------------------------

    function initHeadroom() {

        var headroomOptions = {
            // vertical offset in px before element is first unpinned
            offset : 0,
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
        };

        // Init only if no headroom and return
        if (!headroom) {
            headroom = new Headroom(lvPage, headroomOptions);
            setHeadroomOffset(); // here?
            headroom.init();
            return;
        }
    }

    //-----------------------------------------------------------------
    // SET HEADROOM OFFSET
    // 1050px is where the header is fixed by default
    // Mobile and tablet, the header is dynamic with scroll
    //-----------------------------------------------------------------

    function setHeadroomOffset() {
        headroom.offset = 140;
        if (window.innerWidth >= 768) headroom.offset = 230;
        if (window.innerWidth >= 992) headroom.offset = 230;
    }

    //-----------------------------------------------------------------
    // ON RESIZE
    // Adjust Headroom offset upon resize
    //-----------------------------------------------------------------

    function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            if (headroom) setHeadroomOffset();
        }, 250);
    }

//-
})();
