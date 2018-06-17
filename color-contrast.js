const colorContrast = {

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
		largeTextSizeMinBold: 18.5, // px
		largeTextSizeMinNormal: 24, // px
	},

	/**
	 * Converts font size to points
	 * 
	 * @param {string} size - Can be px, em, percent
	 * @returns {float} size in pixels
	 */
	sizeToPx: function( size ) {
		let sizePattern = new RegExp("([0-9.?0-9?]*)([a-zA-Z]+|%)");
		let sizeMatches = size.match(sizePattern);
		let sizeNum = parseFloat(sizeMatches[1]);
		let sizeUnit = sizeMatches[2];
		let bodyElement = document.getElementsByTagName("body")[0];
		let bodyfontSize = parseFloat(window.getComputedStyle(bodyElement, null).getPropertyValue("font-size").match(sizePattern)[1]);

		if (sizeUnit == "px") {
			return sizeNum;
		} else if (sizeUnit == "em") {
			return bodyfontSize * sizeNum;
		} else if (sizeUnit == "%") {
			return sizeNum/100 * bodyfontSize;
		} else if (sizeUnit == "pt") {
			return sizeNum/0.75;
		}
		
	},

	/**
	* Compare the contrast between two colors
	*
	* Formula from WCAG20 G18
	*    colors defined as...
	*        R sRGB = R 8bit /255
	*        G sRGB = G 8bit /255
	*        B sRGB = B 8bit /255
	*
	*    L = 0.2126 * R + 0.7152 * G + 0.0722 * B
	*        if R sRGB <= 0.03928 then R = R sRGB /12.92 else R = ((R sRGB +0.055)/1.055) ^ 2.4
	*        if G sRGB <= 0.03928 then G = G sRGB /12.92 else G = ((G sRGB +0.055)/1.055) ^ 2.4
	*        if B sRGB <= 0.03928 then B = B sRGB /12.92 else B = ((B sRGB +0.055)/1.055) ^ 2.4
	*
	*    contrast ratio...
	*        (L1 + 0.05) / (L2 + 0.05)
	*        L1 = lighter
	*        L2 = darker
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