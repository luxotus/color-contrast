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
	 * @param {string} fontSize - Can be px, em, percent
	 * @returns {float} size in pixels
	 */
	sizeToPx: function( fontSize ) {
		let size = {
			pattern: new RegExp("([0-9.?0-9?]*)([a-zA-Z]+|%)")
		};
		let body = {
			element: document.getElementsByTagName("body")[0]
		};
		size.matches = fontSize.match(size.pattern);
		size.num = parseFloat(size.matches[1]);
		size.unit = size.matches[2];
		body.fontSize = parseFloat(window.getComputedStyle(body.element, null).getPropertyValue("font-size").match(size.pattern)[1]);

		if (size.unit == "px") {
			return size.num;
		} else if (size.unit == "em") {
			return body.fontSize * size.num;
		} else if (size.unit == "%") {
			return size.num/100 * body.fontSize;
		} else if (size.unit == "pt") {
			return size.num/0.75;
		}
	},

	/**
	* Turns rgba color to its equivalent rgb color based on the color its on top of.
	*
	* @param {{red: int, green: int, blue: int, alpha: float}} foregroundRGBA
	* @param {{red: int, green: int, blue: int}} backgroundRGB
	* @returns {{red: int, green: int, blue: int, rgb: string}} Equivalent RGB values for the foregroundRGBA
	*/
	convertRGBAToRGB: function(foregroundRGBA, backgroundRGB) {
		let colorResult = {};
		colorResult.red = Math.round(((1 - foregroundRGBA.alpha) * backgroundRGB.red) + (foregroundRGBA.alpha * foregroundRGBA.red));
		colorResult.green = Math.round(((1 - foregroundRGBA.alpha) * backgroundRGB.green) + (foregroundRGBA.alpha * foregroundRGBA.green));
		colorResult.blue = Math.round(((1 - foregroundRGBA.alpha) * backgroundRGB.blue) + (foregroundRGBA.alpha * foregroundRGBA.blue));
		colorResult.rgb = "rgb("+colorResult.red+","+colorResult.green+","+colorResult.blue+")";

		return colorResult;
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
	*    L = 0.2126 * R + 0.7152 * G + 0.0722 * B where RGB is defined as 
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
	* @param {string} backgroundColor - only needed if the first or second color has a transparency of less then 1
	* @returns {obj} contrast ratio, same structure as constrastMin
	*/
	compareColors: function( firstColor, secondColor, backgroundColor ) {
		let color = {
			pattern: new RegExp("rgb[a]?\\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3}),? ?(1|0\\.[0-9]{1,10})?\\)"),
			firstColor: {},
			secondColor: {},
		};
		color.firstColor = firstColor.match(color.pattern);
		color.secondColor = secondColor.match(color.pattern);
		color.firstColor = {
			red: parseInt(color.firstColor[1]),
			green: parseInt(color.firstColor[2]),
			blue: parseInt(color.firstColor[3]),
			alpha: firstColor.includes("rgba") ? parseFloat(color.firstColor[4]) : 1,
			rgb: color.firstColor[0],
		};
		color.secondColor = {
			red: parseInt(color.secondColor[1]),
			green: parseInt(color.secondColor[2]),
			blue: parseInt(color.secondColor[3]),
			alpha: secondColor.includes("rgba") ? parseFloat(color.secondColor[4]) : 1,
			rgb: color.secondColor[0],
		};

		if (typeof backgroundColor == "undefined") {
			color.backgroundColor = {
				red: 255,
				green: 255,
				blue: 255,
			}
		} else {
			// assumption that background color is just an rgb() and not rgba()
			color.backgroundColor = backgroundColor.match(color.pattern);
			color.backgroundColor = {
				red: parseInt(color.backgroundColor[1]),
				green: parseInt(color.backgroundColor[2]),
				blue: parseInt(color.backgroundColor[3]),
			};
		}

		if (color.firstColor.alpha < 1) {
			color.firstColor = colorContrast.convertRGBAToRGB(color.firstColor, color.backgroundColor);
		}

		if (color.secondColor.alpha < 1) {
			color.secondColor = colorContrast.convertRGBAToRGB(color.secondColor, color.backgroundColor);
		}

		color.firstColor.sRGB = {
			red: color.firstColor.red/255,
			green: color.firstColor.green/255,
			blue: color.firstColor.blue/255,
		};
		color.secondColor.sRGB = {
			red: color.secondColor.red/255,
			green: color.secondColor.green/255,
			blue: color.secondColor.blue/255,
		};

		let key;
		color.firstColor.lRGB = {};
		color.secondColor.lRGB = {};

		for(key in color.firstColor.sRGB) {
			if (color.firstColor.sRGB[key] <= 0.03928) {
				color.firstColor.lRGB[key] = color.firstColor.sRGB[key]/12.92;
			} else {
				color.firstColor.lRGB[key] = Math.pow(((color.firstColor.sRGB[key] + 0.055)/1.055), 2.4);
			}
		}

		for(key in color.secondColor.sRGB) {
			if (color.secondColor.sRGB[key] <= 0.03928) {
				color.secondColor.lRGB[key] = color.secondColor.sRGB[key]/12.92;
			} else {
				color.secondColor.lRGB[key] = Math.pow(((color.secondColor.sRGB[key] + 0.055)/1.055), 2.4);
			}
		}

		// lum -> luminance
		color.firstColor.lum = 0.2126 * color.firstColor.lRGB.red + 0.7152 * color.firstColor.lRGB.green + 0.0722 * color.firstColor.lRGB.blue;
		color.secondColor.lum = 0.2126 * color.secondColor.lRGB.red + 0.7152 * color.secondColor.lRGB.green + 0.0722 * color.secondColor.lRGB.blue;

		if (color.firstColor.lum <= color.secondColor.lum) {
			color.contrastRatio = (color.firstColor.lum + 0.05) / (color.secondColor.lum + 0.05);
		} else {
			color.contrastRatio = (color.secondColor.lum + 0.05) / (color.firstColor.lum + 0.05);
		}

		return Math.round((1/color.contrastRatio) * 100)/100;
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