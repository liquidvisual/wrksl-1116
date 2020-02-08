/*
    LOCATIONS ACCORDION - Last updated: 20.12.19, 27.03.19, 06.10.16
*/
//-----------------------------------------------------------------
// ACCORDION
//-----------------------------------------------------------------

;(function($){
	'use strict';

	let activeFilters = [];
	const hashBang = window.location.hash || null;
	const $accordion = $('[data-accordion]');
	const $accordionFilter = $('.accordion-filter')
	const $accordionFilterBtns = $('button', $accordionFilter);
	const $accordionTrigger = $('[data-accordion-trigger]');
	const $locationCards = $('> ul > li[data-filter]', $accordion);
	const $triggerAnchors = $('a', $accordionTrigger);

	//-----------------------------------------------------------------
	// INIT
	//-----------------------------------------------------------------

	// If hash is passed from external page.
	if (hashBang && $(hashBang).length) {

		// Highlight button.
		$("a[href='"+hashBang+"']", $accordionTrigger).addClass('active');

		// Open accordion with corresponding hash.
		$(hashBang).addClass('active'); // Eg. $('#sa')

		// Show filter on page open (if hash)
		showFilter();
	}

	//-----------------------------------------------------------------
	// FUNCTIONS
	//-----------------------------------------------------------------

	function removeActive() {
		$accordion.removeClass('active');
		$triggerAnchors.removeClass('active');
	}

	function showFilter() {
		$('.accordion-filter').removeAttr('hidden');
	}

	//-----------------------------------------------------------------
	// CLICK
	//-----------------------------------------------------------------

	$triggerAnchors.on('click', function(event) {

	    const $this = $(this);
	    const id = $this.attr('href');

	    // remove all active classes
	    removeActive();

	    // if not already active
	    if (!$this.hasClass('active')) {
	        // assign active to element
	        $this.addClass('active');
	        $(id).addClass('active');

	        showFilter();
	    }
	});

	//-----------------------------------------------------------------
	// FILTER CLICK
	// activeFilters = ['career transition assistance', 'allied health', 'corporate services']
	// needs to match
	// <li data-filter="allied health, career transition" >
	//-----------------------------------------------------------------

	$accordionFilterBtns.each(function() {

		const $this = $(this);
		const filterId = $this.data('filter-id');

		$this.on('click', function(event) {

			// If NOT active, set active and push to active array
			if (!$this.hasClass('active')) {
				$this.addClass('active');
				activeFilters.push(filterId);
			}
			else {
				$this.removeClass('active');
				activeFilters = activeFilters.filter(item => item !== filterId);
			}

			console.log(activeFilters);

			// Update location cards
			filterLocations();
		})
	});

	//-----------------------------------------------------------------
	// LOCATION CARDS
	//-----------------------------------------------------------------

	function filterLocations() {

		if (activeFilters.length) {

			// Hide all cards.
			$locationCards.attr('hidden', true);

			// Show the relevant one.
			$locationCards.each(function() {
				const $this = $(this);
				const currentListFilters = $this.data('filter').split(',');

				// Loop through filters on the <li>
				for (let i = 0; i < currentListFilters.length; i++) {
					const result = currentListFilters[i].trim().toLowerCase();

					// If current filter on the <li> is an active filter...
					if (result && (activeFilters.indexOf(result) !== -1)) {
						// console.log(result + ' is present');
						$this.attr('hidden', false);
						break;
					}
				}
			});
		}
		else {
			// Show all cards.
			$locationCards.attr('hidden', false);
		}
	}
//--
})(jQuery);

//==================================================
//
//==================================================