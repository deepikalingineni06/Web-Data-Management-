/**
 * Theme functions file.
 *
 * Contains handlers for navigation.
 */

jQuery(function($){
 	"use strict";
   	jQuery('.main-menu-navigation > ul').superfish({
		delay:       500,
		animation:   {opacity:'show',height:'show'},  
		speed:       'fast'
   	});
});

function laundry_master_open() {
	jQuery(".sidenav").addClass('show');
}
function laundry_master_close() {
	jQuery(".sidenav").removeClass('show');
}

function laundry_master_menuAccessibility() {
	var links, i, len,
	    laundry_master_menu = document.querySelector( '.nav-menu' ),
	    laundry_master_iconToggle = document.querySelector( '.nav-menu ul li:first-child a' );
    
	let laundry_master_focusableElements = 'button, a, input';
	let laundry_master_firstFocusableElement = laundry_master_iconToggle; // get first element to be focused inside menu
	let laundry_master_focusableContent = laundry_master_menu.querySelectorAll(laundry_master_focusableElements);
	let laundry_master_lastFocusableElement = laundry_master_focusableContent[laundry_master_focusableContent.length - 1]; // get last element to be focused inside menu

	if ( ! laundry_master_menu ) {
    	return false;
	}

	links = laundry_master_menu.getElementsByTagName( 'a' );

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
	    links[i].addEventListener( 'focus', toggleFocus, true );
	    links[i].addEventListener( 'blur', toggleFocus, true );
	}

	// Sets or removes the .focus class on an element.
	function toggleFocus() {
      	var self = this;

      	// Move up through the ancestors of the current link until we hit .mobile-menu.
      	while (-1 === self.className.indexOf( 'nav-menu' ) ) {
	      	// On li elements toggle the class .focus.
	      	if ( 'li' === self.tagName.toLowerCase() ) {
	          	if ( -1 !== self.className.indexOf( 'focus' ) ) {
	          		self.className = self.className.replace( ' focus', '' );
	          	} else {
	          		self.className += ' focus';
	          	}
	      	}
	      	self = self.parentElement;
      	}
	}
    
	// Trap focus inside modal to make it ADA compliant
	document.addEventListener('keydown', function (e) {
	    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

	    if ( ! isTabPressed ) {
	    	return;
	    }

	    if ( e.shiftKey ) { // if shift key pressed for shift + tab combination
	      	if (document.activeElement === laundry_master_firstFocusableElement) {
		        laundry_master_lastFocusableElement.focus(); // add focus for the last focusable element
		        e.preventDefault();
	      	}
	    } else { // if tab key is pressed
	    	if (document.activeElement === laundry_master_lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
		      	laundry_master_firstFocusableElement.focus(); // add focus for the first focusable element
		      	e.preventDefault();
	    	}
	    }
	});   
}

jQuery(function($){
	$('.mobile-menu').click(function () {
	    laundry_master_menuAccessibility();
  	});
});