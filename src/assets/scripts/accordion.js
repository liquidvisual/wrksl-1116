/*
    MAIN.JS - Last updated: 27.03.19, 06.10.16
*/
//-----------------------------------------------------------------
// ACCORDION - USED IN LOCATIONS
//-----------------------------------------------------------------

;(function($){
	'use strict';

	const hashBang = window.location.hash || null;
	const $accordion = $('[data-accordion]');
	const $accordionTrigger = $('[data-accordion-trigger]');
	const $triggerAnchors = $('a', $accordionTrigger)

	//-----------------------------------------------------------------
	// INIT
	//-----------------------------------------------------------------

	if (hashBang) {
		try {
			$(hashBang).addClass('active'); // $('#sa')
			$('a[href='+hashBang+']', $accordionTrigger).addClass('active');

			removeActive();
		}
		catch(error) {
			// fail silently
		}
	}

	//-----------------------------------------------------------------
	// REMOVE ACTIVE
	//-----------------------------------------------------------------

	function removeActive() {
		$accordion.removeClass('active');
		$triggerAnchors.removeClass('active');
	}

	//-----------------------------------------------------------------
	// CLICK
	//-----------------------------------------------------------------

	$triggerAnchors.on('click', function(event) {

	    const $this = $(this);
	    const id = $this.attr('href');

	    removeActive();

	    // if not already active
	    if (!$this.hasClass('active')) {
	        // remove all active classes
	        $this.addClass('active');
	        $(id).addClass('active');
	    }
	});

//--
})(jQuery);

//==================================================
//
//==================================================