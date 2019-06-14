/*
    NAV.JS - Last updated: 19.05.19
*/
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

;(function() {
	'use strict';

	// missing forEach on NodeList for IE11
	if (window.NodeList && !NodeList.prototype.forEach) {
	  NodeList.prototype.forEach = Array.prototype.forEach;
	}

	const nav = document.querySelector('.lv-topbar');

	// https://github.com/babel/babel/issues/6511
	const navTopListItems = nav.querySelectorAll('ul:first-child > li');

	const windowPath = window.location.pathname;
	const pathArray = windowPath.split('/').slice(1).slice(0, -1);

	//-----------------------------------------------------------------
	// INIT STATE
	// ON HOMEPAGE, 'FOR INDIVIDUALS' IS SELECTED
	//-----------------------------------------------------------------

	if (windowPath == '/') {
		nav.querySelector('li:nth-child(2)').classList.add('active');
	}

	//-----------------------------------------------------------------
	// PRESETS
	//-----------------------------------------------------------------

	else if (windowPath == '/about/') {
		nav.querySelector('li[data-alias="about"]').classList.add('active');
	}
	else if (windowPath == '/about-us/') {
		nav.querySelector('li[data-alias="about-us"]').classList.add('active');
	}
	else if (windowPath == '/search/') {
		nav.querySelector('li[data-alias="search"]').classList.add('active');
	}

	//-----------------------------------------------------------------
	// OTHER PAGES
	//-----------------------------------------------------------------

	else {
		// current anchor from pathname
		const anchor = nav.querySelector('a[href="'+windowPath+'"]');

		if (anchor) {
			//-----------------------------------------------------------------
			// FIRST LEVEL
			//-----------------------------------------------------------------

			if (pathArray.length <= 2) {
				const parentListItem = anchor.parentNode.parentNode.parentNode;

				// if it's /contact/ don't apply active, the above code will do it
				if (!parentListItem.classList.contains('lv-topbar')) {
					parentListItem.classList.add('active');
				}
			}

			//-----------------------------------------------------------------
			// SECOND LEVEL
			//-----------------------------------------------------------------

			if (pathArray.length <= 3) {
				const parentListItem = anchor.parentNode.parentNode.parentNode.parentNode.parentNode;
				parentListItem.classList.add('active');
			}

			//-----------------------------------------------------------------
			// THIRD LEVEL
			// these aren't visible in the nav, but still affect the parent
			//-----------------------------------------------------------------

			if (pathArray.length == 3) {

				const secondLevelListItem = anchor.parentNode.parentNode.parentNode.parentNode.parentNode;
				const topLevelListItem = secondLevelListItem.parentNode.parentNode;

				// set top level
				topLevelListItem.classList.add('active');

				// rush job, argh - refactor
				anchor.parentNode.parentNode.parentNode.classList.add('active')
			}
		}
	}

	//-----------------------------------------------------------------
	// NAV TOGGLE
	//-----------------------------------------------------------------

	navTopListItems.forEach((item) => {
		const anchor = item.querySelector('a');

		if (anchor) {
			anchor.addEventListener('click', function(event, parent=item) {
				event.preventDefault();

				const hashAnchor = this.href.indexOf('#') > -1;

				// hash based eg. '#/search/'
				if (!hashAnchor) {
					deselectAll(navTopListItems);
					parent.classList.add('active');
				}

				// if no dropdown, it's a link. Eg. /contact/
				// delay page refresh until animation finishes
				// UNLESS the href is hash based eg. '#/search/'
				if (!parent.classList.contains('has-dropdown') && !hashAnchor) {
					document.documentElement.classList.add('has-closed-nav');

					setTimeout(() => {
						window.location = this.href;
					}, 150);

				// otherwise it's not /contact/ or /search/ - reduce nav height
				} else if (!hashAnchor) {
					document.documentElement.classList.remove('has-closed-nav');
				}
			});
		}
	});

	//-----------------------------------------------------------------
	// DESELECT ALL
	//-----------------------------------------------------------------

	function deselectAll(items) {
		items.forEach((item) => {
			item.classList.remove('active');
		})
	}
})();