const colorContrast = {

	/**
	 * Turns hex into a float
	 * 
	 * @param {hexadecimal}
	*/
	alphaHex ( hex ) {
		return parseFloat(parseInt((parseInt(hex)/255)*1000)/1000);
	},

	/**
	 * Convert hex into a rgb/rgba color value
	 * 
	 * @param {string} hex - this can be in 3 different forms. Ex #000 or #123456 or #123456FF
	*/
	hexToRgbA ( hex ) {
		let color = {};
	
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) { // 3 or 6 digit hex color
			color.rawHex = hex.substring(1).split('');
	
			if (color.rawHex.length == 3) {
				color.rawHex = [color.rawHex[0], color.rawHex[0], color.rawHex[1], color.rawHex[1], color.rawHex[2], color.rawHex[2]];
			}
	
			color.rawHex = '0x'+color.rawHex.join(''); // turning to hex
			color.red = (color.rawHex>>16)&255;
			color.green = (color.rawHex>>8)&255;
			color.blue = color.rawHex&255;
			color.message = 'rgb(' + [color.red, color.green, color.blue].join(', ') + ')';
		} else if (/^#([A-Fa-f0-9]{4}){1,2}$/.test(hex)) { // 8 digit hex color
			color.rawHex = hex.substring(1).split('');
			color.rawHex = '0x'+color.rawHex.join('');
			color.red = (color.rawHex>>24)&255;
			color.green = (color.rawHex>>16)&255;
			color.blue = (color.rawHex>>8)&255;
			color.alpha = colorContrast.alphaHex(color.rawHex&255);
			color.message = 'rgba(' + [color.red, color.green, color.blue].join(', ') + ', ' + color.alpha +')';
		} else {
			color.message = 'Not a valid hex color code.';
		}

		return color.message;
	},

	/**
	 * Converts font size to points
	 * 
	 * @param {string} fontSize - Can be px, em, percent
	 * @returns {float} size in pixels
	 */
	sizeToPx ( fontSize ) {
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
	 * Convert font weight to a numeric value
	*/
	weightToNum ( fontWeight, parentWeight = 0 ) {
		let weight = {
			child: parseInt(fontWeight),
			parent: parseInt(parentWeight),
		};

		if (isNaN(weight.child)) {
			let weightStr = fontWeight.toLowerCase();

			if (weightStr == "normal") {
				weight.child = 400;
			} else if (weightStr == "bold") {
				weight.child = 700;
			} else if (weightStr == "lighter") {
				if (isNaN(weight.parent)) {
					weight.child = 0;
				} else {
					weight.child = weight.parent - 100;
				}
			} else if (weightStr == "bolder") {
				if (isNaN(weight.parent)) {
					weight.child = 0;
				} else {
					weight.child = weight.parent + 100;
				}
			} else {
				weight.child = 0;
			}
		}

		return weight.child;
	},

	/**
	* Turns rgba color to its equivalent rgb color based on the color its on top of.
	*
	* @param {{red: int, green: int, blue: int, alpha: float}} foregroundRGBA
	* @param {{red: int, green: int, blue: int}} backgroundRGB
	* @returns {{red: int, green: int, blue: int, rgb: string}} Equivalent RGB values for the foregroundRGBA
	*/
	convertRGBAToRGB ( foregroundRGBA, backgroundRGB ) {
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
	* @returns {float} contrast ratio
	*/
	compareColors ( firstColor, secondColor, backgroundColor ) {
		let color = {
			rgbPattern: new RegExp('rgb[a]?\\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3}),? ?(1|0\\.[0-9]{1,10})?\\)'),
			hexPattern: new RegExp('^#[0-9A-Za-z]{8}$|^#[0-9A-Za-z]{6}$|^#[0-9A-Za-z]{3}$'),
			firstColor: {},
			secondColor: {},
		};
		backgroundColor = backgroundColor || null;

		// turning colors into rgb/a
		if (firstColor.match(color.hexPattern) != null) {
			firstColor = colorContrast.hexToRgbA(firstColor);
		}

		console.log(firstColor);
		
		if (secondColor.match(color.hexPattern) != null) {
			secondColor = colorContrast.hexToRgbA(secondColor);	
		}

		if (backgroundColor != null && backgroundColor.match(color.hexPattern) != null) {
			backgroundColor = colorContrast.hexToRgbA(backgroundColor);
		}

		color.firstColor = firstColor.match(color.rgbPattern);
		color.secondColor = secondColor.match(color.rgbPattern);
		
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

		if (backgroundColor === null) {
			color.backgroundColor = {
				red: 255,
				green: 255,
				blue: 255,
			}
		} else {
			// assumption that background color is just an rgb() and not rgba()
			color.backgroundColor = backgroundColor.match(color.rgbPattern);
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
	* Determine if the text passes or fails WCAG20 G18
	*
	* @param {string} fontSize
	* @param {string} fontWeight
	* @param {string} fontColor
	* @param {string} backgroundColor
	* @param {string} parentBackgroundColor - optional, used when backgroundColor has semi transparent
	* @returns {{levelAA: boolean, levelAAA: boolean, contrastRatio: float, recomendations: string}}
	*/
	compareElements ( fontSize, fontWeight, fontColor, backgroundColor, parentBackgroundColor, parentFontWeight ) {
		
		// Contrast Requirements set by WCAG20
		let contrastMin = {
			levelAA: {
				normalText: 4.5,
				largeText: 3,
			},
			levelAAA: {
				normalText: 7,
				largeText: 4.5,
			},
			largeTextSizeMinBold: 18.5, // px
			largeTextSizeMinNormal: 24, // px
		};
		let comparedContrast = {
			levelAA: false,
			levelAAA: false,
			contrastRatio: 0,
			recomendations: "",
		};
		parentBackgroundColor = parentBackgroundColor || null;
		parentFontWeight = parentFontWeight || null;

		// seperate font size from its unit of measure
		let font = {
			size: colorContrast.sizeToPx(fontSize),
			weight: colorContrast.weightToNum(fontWeight),
			contrastRatio: colorContrast.compareColors(fontColor, backgroundColor, parentBackgroundColor),
		};
		let isBold = font.weight >= 700 ? true : false;

		comparedContrast.levelAA = (font.contrastRatio >= contrastMin.levelAA.normalText && !isBold || font.contrastRatio >= contrastMin.levelAA.largeText && isBold);
		comparedContrast.levelAAA = (font.contrastRatio >= contrastMin.levelAAA.normalText && !isBold || font.contrastRatio >= contrastMin.levelAAA.largeText && isBold);

		// Determine whether or not the text passes WCAG20 G18
		if (!comparedContrast.levelAA) {
			comparedContrast.levelAA = false;
			comparedContrast.recomendations = "Contrast to low, you should increase/decrease font color or background color.";
		}

		if (!comparedContrast.levelAAA) {
			comparedContrast.levelAAA = false;
			comparedContrast.recomendations = "Contrast to low, you should increase/decrease font color or background color."
		}

		comparedContrast.contrastRatio = font.contrastRatio;

		return comparedContrast;
	}
};