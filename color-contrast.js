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

	colorNamesToRGB ( colorName ) {
		let color = {
			AliceBlue: "rgb(240, 248, 255)", 
			AntiqueWhite: "rgb(250, 235, 215)", 
			Aqua: "rgb(0, 255, 255)", 
			Aquamarine: "rgb(127, 255, 212)", 
			Azure: "rgb(240, 255, 255)", 
			Beige: "rgb(245, 245, 220)", 
			Bisque: "rgb(255, 228, 196)", 
			Black: "rgb(0, 0, 0)", 
			BlanchedAlmond: "rgb(255, 235, 205)", 
			Blue: "rgb(0, 0, 255)", 
			BlueViolet: "rgb(138, 43, 226)", 
			Brown: "rgb(165, 42, 42)", 
			BurlyWood: "rgb(222, 184, 135)", 
			CadetBlue: "rgb(95, 158, 160)", 
			Chartreuse: "rgb(127, 255, 0)", 
			Chocolate: "rgb(210, 105, 30)", 
			Coral: "rgb(255, 127, 80)", 
			CornflowerBlue: "rgb(100, 149, 237)", 
			Cornsilk: "rgb(255, 248, 220)", 
			Crimson: "rgb(220, 20, 60)", 
			Cyan: "rgb(0, 255, 255)", 
			DarkBlue: "rgb(0, 0, 139)", 
			DarkCyan: "rgb(0, 139, 139)", 
			DarkGoldenRod: "rgb(184, 134, 11)", 
			DarkGray: "rgb(169, 169, 169)", 
			DarkGrey: "rgb(169, 169, 169)", 
			DarkGreen: "rgb(0, 100, 0)", 
			DarkKhaki: "rgb(189, 183, 107)", 
			DarkMagenta: "rgb(139, 0, 139)", 
			DarkOliveGreen: "rgb(85, 107, 47)", 
			DarkOrange: "rgb(255, 140, 0)", 
			DarkOrchid: "rgb(153, 50, 204)", 
			DarkRed: "rgb(139, 0, 0)", 
			DarkSalmon: "rgb(233, 150, 122)", 
			DarkSeaGreen: "rgb(143, 188, 143)", 
			DarkSlateBlue: "rgb(72, 61, 139)", 
			DarkSlateGray: "rgb(47, 79, 79)", 
			DarkSlateGrey: "rgb(47, 79, 79)", 
			DarkTurquoise: "rgb(0, 206, 209)", 
			DarkViolet: "rgb(148, 0, 211)", 
			DeepPink: "rgb(255, 20, 147)", 
			DeepSkyBlue: "rgb(0, 191, 255)", 
			DimGray: "rgb(105, 105, 105)", 
			DimGrey: "rgb(105, 105, 105)", 
			DodgerBlue: "rgb(30, 144, 255)", 
			FireBrick: "rgb(178, 34, 34)", 
			FloralWhite: "rgb(255, 250, 240)", 
			ForestGreen: "rgb(34, 139, 34)", 
			Fuchsia: "rgb(255, 0, 255)", 
			Gainsboro: "rgb(220, 220, 220)", 
			GhostWhite: "rgb(248, 248, 255)", 
			Gold: "rgb(255, 215, 0)", 
			GoldenRod: "rgb(218, 165, 32)", 
			Gray: "rgb(128, 128, 128)", 
			Grey: "rgb(128, 128, 128)", 
			Green: "rgb(0, 128, 0)", 
			GreenYellow: "rgb(173, 255, 47)", 
			HoneyDew: "rgb(240, 255, 240)", 
			HotPink: "rgb(255, 105, 180)", 
			IndianRed: "rgb(205, 92, 92)", 
			Indigo: "rgb(75, 0, 130)", 
			Ivory: "rgb(255, 255, 240)", 
			Khaki: "rgb(240, 230, 140)", 
			Lavender: "rgb(230, 230, 250)", 
			LavenderBlush: "rgb(255, 240, 245)", 
			LawnGreen: "rgb(124, 252, 0)", 
			LemonChiffon: "rgb(255, 250, 205)", 
			LightBlue: "rgb(173, 216, 230)", 
			LightCoral: "rgb(240, 128, 128)", 
			LightCyan: "rgb(224, 255, 255)", 
			LightGoldenRodYellow: "rgb(250, 250, 210)", 
			LightGray: "rgb(211, 211, 211)", 
			LightGrey: "rgb(211, 211, 211)", 
			LightGreen: "rgb(144, 238, 144)", 
			LightPink: "rgb(255, 182, 193)", 
			LightSalmon: "rgb(255, 160, 122)", 
			LightSeaGreen: "rgb(32, 178, 170)", 
			LightSkyBlue: "rgb(135, 206, 250)", 
			LightSlateGray: "rgb(119, 136, 153)", 
			LightSlateGrey: "rgb(119, 136, 153)", 
			LightSteelBlue: "rgb(176, 196, 222)", 
			LightYellow: "rgb(255, 255, 224)", 
			Lime: "rgb(0, 255, 0)", 
			LimeGreen: "rgb(50, 205, 50)", 
			Linen: "rgb(250, 240, 230)", 
			Magenta: "rgb(255, 0, 255)", 
			Maroon: "rgb(128, 0, 0)", 
			MediumAquaMarine: "rgb(102, 205, 170)", 
			MediumBlue: "rgb(0, 0, 205)", 
			MediumOrchid: "rgb(186, 85, 211)", 
			MediumPurple: "rgb(147, 112, 219)", 
			MediumSeaGreen: "rgb(60, 179, 113)", 
			MediumSlateBlue: "rgb(123, 104, 238)", 
			MediumSpringGreen: "rgb(0, 250, 154)", 
			MediumTurquoise: "rgb(72, 209, 204)", 
			MediumVioletRed: "rgb(199, 21, 133)", 
			MidnightBlue: "rgb(25, 25, 112)", 
			MintCream: "rgb(245, 255, 250)", 
			MistyRose: "rgb(255, 228, 225)", 
			Moccasin: "rgb(255, 228, 181)", 
			NavajoWhite: "rgb(255, 222, 173)", 
			Navy: "rgb(0, 0, 128)", 
			OldLace: "rgb(253, 245, 230)", 
			Olive: "rgb(128, 128, 0)", 
			OliveDrab: "rgb(107, 142, 35)", 
			Orange: "rgb(255, 165, 0)", 
			OrangeRed: "rgb(255, 69, 0)", 
			Orchid: "rgb(218, 112, 214)", 
			PaleGoldenRod: "rgb(238, 232, 170)", 
			PaleGreen: "rgb(152, 251, 152)", 
			PaleTurquoise: "rgb(175, 238, 238)", 
			PaleVioletRed: "rgb(219, 112, 147)", 
			PapayaWhip: "rgb(255, 239, 213)", 
			PeachPuff: "rgb(255, 218, 185)", 
			Peru: "rgb(205, 133, 63)", 
			Pink: "rgb(255, 192, 203)", 
			Plum: "rgb(221, 160, 221)", 
			PowderBlue: "rgb(176, 224, 230)", 
			Purple: "rgb(128, 0, 128)", 
			RebeccaPurple: "rgb(102, 51, 153)", 
			Red: "rgb(255, 0, 0)", 
			RosyBrown: "rgb(188, 143, 143)", 
			RoyalBlue: "rgb(65, 105, 225)", 
			SaddleBrown: "rgb(139, 69, 19)", 
			Salmon: "rgb(250, 128, 114)", 
			SandyBrown: "rgb(244, 164, 96)", 
			SeaGreen: "rgb(46, 139, 87)", 
			SeaShell: "rgb(255, 245, 238)", 
			Sienna: "rgb(160, 82, 45)", 
			Silver: "rgb(192, 192, 192)", 
			SkyBlue: "rgb(135, 206, 235)", 
			SlateBlue: "rgb(106, 90, 205)", 
			SlateGray: "rgb(112, 128, 144)", 
			SlateGrey: "rgb(112, 128, 144)", 
			Snow: "rgb(255, 250, 250)", 
			SpringGreen: "rgb(0, 255, 127)", 
			SteelBlue: "rgb(70, 130, 180)", 
			Tan: "rgb(210, 180, 140)", 
			Teal: "rgb(0, 128, 128)", 
			Thistle: "rgb(216, 191, 216)", 
			Tomato: "rgb(255, 99, 71)", 
			Turquoise: "rgb(64, 224, 208)", 
			Violet: "rgb(238, 130, 238)", 
			Wheat: "rgb(245, 222, 179)", 
			White: "rgb(255, 255, 255)", 
			WhiteSmoke: "rgb(245, 245, 245)", 
			Yellow: "rgb(255, 255, 0)", 
			YellowGreen: "rgb(154, 205, 50)"
		};

		if (color.hasOwnProperty(colorName)) {
			return color[colorName];
		} else {
			return false;
		}
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
		} else if (colorContrast.colorNamesToRGB(firstColor)) {
			firstColor = colorContrast.colorNamesToRGB(firstColor);
		}

		console.log(firstColor);
		
		if (secondColor.match(color.hexPattern) != null) {
			secondColor = colorContrast.hexToRgbA(secondColor);	
		} else if (colorContrast.colorNamesToRGB(secondColor)) {
			secondColor = colorContrast.colorNamesToRGB(secondColor);
		}

		if (backgroundColor != null) {
			if (backgroundColor.match(color.hexPattern) != null) {
				backgroundColor = colorContrast.hexToRgbA(backgroundColor);
			} else if (colorContrast.colorNamesToRGB(backgroundColor)) {
				backgroundColor = colorContrast.colorNamesToRGB(backgroundColor);
			}
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