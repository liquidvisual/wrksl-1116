/*
    MAIN.JS - Last updated: 27.03.19
*/
//-----------------------------------------------------------------
// NEWSLETTER MODAL
// https://github.com/1000hz/bootstrap-validator/issues/336
// PROBLEMS WITH MODAL - hot patch
//-----------------------------------------------------------------

$("#modal-newsletter").on("shown.bs.modal", function () {
    $(this).find("form").validator("destroy").validator();
});

//-----------------------------------------------------------------
// STICKY POLYFIL
//-----------------------------------------------------------------

var elements = $(".is-sticky");
Stickyfill.add(elements);

//-----------------------------------------------------------------
// EQUAL HEIGHT
//-----------------------------------------------------------------

$("[data-equal-height]").matchHeight({
    byRow: false,
    property: "height",
    target: null,
    remove: false,
    mq: "(min-width: 768px)",
});

//-----------------------------------------------------------------
// IMAGE MAP RESZIER
//-----------------------------------------------------------------

$("#aus-map").imageMapResize();

//-----------------------------------------------------------------
// SITEMAP TRIGGER - 2019
//-----------------------------------------------------------------

$("[data-sitemap-trigger]").on("click", function (event) {
    $(".fa", $(this)).toggleClass("fa-angle-down");
    $("[data-sitemap]").toggleClass("is-collapsed");
});

//-----------------------------------------------------------------
// SCROLL-TO (NEW) - 2019
// Exclude empty links, sitemap and tabs
//-----------------------------------------------------------------

$('a[href*="#"]:not([href="#"], [data-toggle="tab"])').on("click", function () {
    var id = $(this).attr("href");
    var endPos = $(id);
    var headerHeight = $(".global-header").height();

    // For location accordion.
    if (
        endPos.length &&
        $(this).parent().parent().parent().hasClass("accordion-trigger")
    ) {
        $.scrollTo(endPos.offset().top - 220, 800);
        return false; // don't show hash link in url
    }

    // For everything else.
    if (endPos.length) {
        $.scrollTo(endPos.offset().top - headerHeight, 800);
        return false; // don't show hash link in url
    }
});

//-----------------------------------------------------------------
// SCROLL TOP
//-----------------------------------------------------------------

$("[data-back-top]").click(function () {
    $.scrollTo(0, 500);
});

//-----------------------------------------------------------------
// FONT RESIZER
// https://stackoverflow.com/questions/1055336/changing-the-browser-zoom-level
// https://stackoverflow.com/questions/17907445/how-to-detect-ie11
// https://makandracards.com/makandra/53475-minimal-javascript-function-to-detect-version-of-internet-explorer-or-edge
//-----------------------------------------------------------------

var currFFZoom = 1;
var currIEZoom = 100;
var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
var isIE11 = ieVersion() === 11 || false;

function ieVersion(uaString) {
    uaString = uaString || navigator.userAgent;
    var match = /\b(MSIE |Trident.*?rv:|Edge\/)(\d+)/.exec(uaString);
    if (match) return parseInt(match[2]);
}

$("[data-resize-up]").on("click", function () {
    if (isFirefox || isIE11) {
        var step = 0.02;
        currFFZoom += step;
        $("body").css("transform", "scale(" + currFFZoom + ")");
        $("body").css("transform-origin", "top center");
    } else {
        var step = 2;
        currIEZoom += step;
        $("body").css("zoom", " " + currIEZoom + "%");
    }
});

$("[data-resize-down]").on("click", function () {
    if (isFirefox || isIE11) {
        var step = 0.02;
        currFFZoom -= step;
        $("body").css("transform", "scale(" + currFFZoom + ")");
    } else {
        var step = 2;
        currIEZoom -= step;
        $("body").css("zoom", " " + currIEZoom + "%");
    }
});

/*
var fontResizer = document.querySelector('[data-font-resizer]');
var fontResizerDownBtn = fontResizer.querySelector('[data-resize-down]');
var fontResizerUpBtn = fontResizer.querySelector('[data-resize-up]');

var fontResizeIncrement = 0;

function resizeFont(target, val) {
    target.addEventListener('mousedown', function() {
        fontResizeIncrement += val;
        // var result = 16 + (fontResizeIncrement * 1.01) + 'px';
        // document.documentElement.style.fontSize = result;
        // console.log(16 * val + 'px');

        var result = 100 + (fontResizeIncrement * 1.2) + '%';
        document.documentElement.style.zoom = result;

        console.log(result)
    })
}

resizeFont(fontResizerDownBtn, -1);
resizeFont(fontResizerUpBtn, 1);
*/

//-----------------------------------------------------------------
// TOOLTIPS
//-----------------------------------------------------------------

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

//-----------------------------------------------------------------
// RESOURCE BTNS
// for-individuals/online-resource-hub/
//-----------------------------------------------------------------

var $isMobile = $(window).width() < 768;

function $resourceTiles() {
    var $resourceBtns = $("[data-resource-btn]");
    var $menus = $("[data-resource-btn-hover-menu]");

    $resourceBtns.each(function () {
        var $this = $(this);
        var $menu = $("[data-resource-btn-hover-menu]", $this);
        var $closeBtn = $("[data-resource-btn-hover-menu-close]", $this);

        $this.on("click", function () {
            var isActive = $this.hasClass("is-active");

            if (!$isMobile) {
                return;
            }

            $resourceBtns.removeClass("is-active");
            $menus.css({ display: "none" });

            if (isActive) {
                return;
            }

            $this.addClass("is-active");
            $menu.css({ display: "flex" });
        });

        $closeBtn.on("click", function (e) {
            e.stopPropagation();
            $resourceBtns.removeClass("is-active");
            $menus.css({ display: "none" });
        });
    });
}

$resourceTiles();