/*
    MAIN.JS - Last updated: 06.10.16
*/
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------
//-----------------------------------------------------------------
// ACCORDION - USED IN LOCATIONS
//-----------------------------------------------------------------

$('[data-accordion-trigger] a').on('click', function(event){
    var $this = $(this);
    var id = $this.attr('href');
    var isOpen = $this.hasClass('active');

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

//-----------------------------------------------------------------
// ACCORDION - USED IN LOCATIONS
//-----------------------------------------------------------------

function setLocationsAccordion() {
    var hashBang = window.location.hash!=='' ? window.location.hash : null;
    var $target = $(hashBang); // $('#sa')
    var $trigger = $('a[href='+hashBang+']', $('[data-accordion-trigger]'));

    // remove all active classes
    $('[data-accordion-trigger] a').removeClass('active');
    $('[data-accordion]').removeClass('active');

    if (hashBang) {
        $target.addClass('active');
        $trigger.addClass('active');
    }
}

//==================================================
// DO IT
//==================================================

setLocationsAccordion();