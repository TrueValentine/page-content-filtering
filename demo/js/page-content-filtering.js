/*
 * Page Content Filtering v1.0
 *
 * Copyright 2015 Carlos Ruiz / carlosruiz.me
 *
 */

function pcFiltering(targetContainer) {
	
  // SET SOME DEFAULTS
	jQuery('#content ' + targetContainer).addClass('visible');
	jQuery('.count').addClass('hide-count');
	jQuery('.count-single').addClass('hide-count');
	
  // WHEN KEYWORDS ARE ENTERED BY THE USER
	jQuery('#terms').keyup(function(event) {
	  // Set a variable based on the entered terms.
	  var currentFilterQuery = jQuery('#terms').val();
	  // If terms are removed (back spaced for instance) and the field is empty again
	  if (currentFilterQuery == '') {
		// we want to hide the counter text again
		jQuery('.count').addClass('hide-count');
		// and make each target container visible again.
		jQuery('#content ' + targetContainer).addClass('visible');
	  } else {
		// But if there are terms present, test each target container using the filter function below to see if it should be hidden or visible.
		filter('#content ' + targetContainer, currentFilterQuery);
	  }
	});

  // FILTERING
	// Establish the parts of a regular expression that will go on the two sides of the string and in between the individual keywords.
	var reBegin = '(?=.*?(';
	var reMiddle = '))(?=.*?(';
	var reEnd = ')).*';
	// Put the keywords and RegEx values together.
	function filter(selector, query) {
	  // Trim white space from the beginning and end of the search string just in case.
	  var wsQueryA = jQuery.trim(query);
	  // Add reMiddle for regex between words.
	  var wsQueryB = wsQueryA.replace(/ /gi, reMiddle);
	  // Cap the beginning and end of the string.
	  var wsQueryC = reBegin + wsQueryB + reEnd;
	  // Pass the value of the completed search string to a new variable and specify that it does not need to be case sensitive.
	  var wsQueryD = new RegExp(wsQueryC, 'i');
	  // SEND A VALUE TO THE COUNTER
		// Start with a count value of 0
		var count = 0;
		// and check each target container for a match.
		jQuery(selector).each(function() {
		  if (jQuery(this).text().search(wsQueryD) < 0) {
			// Hide if NOT a match
			jQuery(this).removeClass('visible');  
		  } else {
			// and show if a match.  
			jQuery(this).addClass('visible');
			// Add 1 to the counter value for each match.
			count++;
			}
	  	});
	  // RENDER THE COUNTER IN A READABLE FORMAT
		// If only one target container matches
		if (count == 1) {
		  // show only the count text (singular) for a SINGLE match.
		  jQuery('.count').addClass('hide-count');
		  jQuery('.count-single').removeClass('hide-count');
		  // But if more than one target container matches
		} else {
		  // show only the count text (plural) for MULTIPLE matches.
		  jQuery('.count').removeClass('hide-count');
		  jQuery('.count-single').addClass('hide-count');
		  }
		// Deliver the final count value.
		jQuery('.filter-count').text(count);
	}
	
}