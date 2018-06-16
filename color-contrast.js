var colorContrast = {

	/**
	* Contrast Requirements set by WCAG20
	*/
	contrastMin: {
		levelAA: {
			normalText: 4.5,
			largeText: 3
		},
		levelAAA: {
			normalText: 7,
			largeText: 4.5
		},
		largeTextSizeMin: 14, // points
	},

	/**
	 * Converts font size to points
	 * 
	 * @param {string} size - Can be px, em, percent
	 */
	sizeToPoint: function( size ) {

	},

	/**
	* Compare the contrast between two colors
	*
	* @param {string} firstColor
	* @param {string} secondColor
	* @returns {obj} contrast ratio, same structure as constrastMin
	*/
	compareColors: function( firstColor, secondColor ) {

	},

	/**
	* Compare the contrast between to elements
	*
	* @param {obj} firstElement
	* @param {obj} secondElement
	*/
	compareElements: function( firstElement, secondElement ) {

	},

	/**
	* Crawls through dom to find color contrast violations and tags them
	*
	* @returns {obj} list of all contrast violators
	*/
	colorContrastSearch: function() {

	},

	/**
	* Adjust color/s to meet contrastMin requirements
	*
	* @param {string} foregroundColor - Usually text or smaller element, since this is what focuses the eye 
	* @param {string} backgroundColor - parent element or larger element
	* @parm {string} adjustmentPref - used to determine which color should be adjusted, values: "foreground", "background", "both"
	* @return {obj} new color/s after adjustments
	*/
	adjustColor: function( foregroundColor, backgroundColor, adjustmentPref) {

	},

	/**
	* Accepts elements that need colors adjusted
	*
	* @param {obj} firstElement
	* @param {obj} secondElement
	* @parm {string} adjustmentPref - used to determine which color should be adjusted, values: "first", "second", "both"
	*/
	fixContrastManual: function( firstElement, secondElement, adjustmentPref ) {

	},

	/**
	* Crawls through dom and automatically fixes color contrast by adjusting colors
	*/
	fixContrastAuto: function() {

	},
};