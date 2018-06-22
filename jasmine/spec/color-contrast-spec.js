describe('colorContrast', () => {

    // alphaHex
    describe('Alpha from hex', function() {
        it('100% Visible', function() {
            expect(colorContrast.alphaHex('0xFF')).toBe(1);
        });
        it('75% Visible', function() {
            expect(colorContrast.alphaHex('0xbf')).toBe(0.749);
        });
        it('50% Visible', function() {
            expect(colorContrast.alphaHex('0x80')).toBe(0.501);
        });
        it('25% Visible', function() {
            expect(colorContrast.alphaHex('0x40')).toBe(0.25);
        });
        it('0% Visible', function() {
            expect(colorContrast.alphaHex('0x00')).toBe(0);
        });
    });

    // hexToRgbA
    describe('Hex color to RGB/RGBA', function() {
        it('Standard 6 digit hex color', function() {
            expect(colorContrast.hexToRgbA('#5822d5')).toBe('rgb(88, 34, 213)');
        });
        it('Short-hand 3 digit hex color', function() {
            expect(colorContrast.hexToRgbA('#2f6')).toBe('rgb(34, 255, 102)');
        });
        it('8 digit hex color that includes transparency', function() {
            expect(colorContrast.hexToRgbA('#ff6c00ba')).toBe('rgba(255, 108, 0, 0.729)');
        });
    });

    // colorNamesToRGB
    describe('HTML defined colors to RGB', function() {
        it('Color Name: AliceBlue', function() {
            expect(colorContrast.colorNamesToRGB('AliceBlue')).toBe('rgb(240, 248, 255)');
        });
        it('Color Name: HoneyDew', function() {
            expect(colorContrast.colorNamesToRGB('HoneyDew')).toBe('rgb(240, 255, 240)');
        });
        it('Color Name: PapayaWhip', function() {
            expect(colorContrast.colorNamesToRGB('PapayaWhip')).toBe('rgb(255, 239, 213)');
        });
    });

    // sizeToPx
    describe('Convert font size to pixels', function() {
        it('Font Size: pixels', function() {
            expect(colorContrast.sizeToPx('14px')).toBe(14);
        });
        it('Font Size: em', function() {
            expect(colorContrast.sizeToPx('2em', '12px')).toBe(24);
        });
        it('Font Size: %', function() {
            expect(colorContrast.sizeToPx('73%', '11px')).toBe(8.03);
        });
    });

    // weightToNum ( fontWeight, parentWeight = 400 )
    describe('Convert font weight to a numeric value', function() {
        it('weight: 300', function() {
            expect(colorContrast.weightToNum('300')).toBe(300);
        });
        it('weight: normal', function() {
            expect(colorContrast.weightToNum('normal')).toBe(400);
        });
        it('weight: bold', function() {
            expect(colorContrast.weightToNum('bold')).toBe(700);
        });
        it('weight: lighter', function() {
            expect(colorContrast.weightToNum('lighter', '600')).toBe(500);
        });
        it('weight: bolder', function() {
            expect(colorContrast.weightToNum('bolder', '500')).toBe(600);
        });
    });

    // convertRGBAToRGB ( foregroundRGBA, backgroundRGB )
    describe('Turns rgba color to its equivalent rgb color', function() {
        it('RGBA to RGB', function() {
            expect(colorContrast.convertRGBAToRGB({red: 55, green: 110, blue: 255, alpha: 0.87}, {red: 255, green: 255, blue: 255})).toEqual(jasmine.objectContaining({red: 81, green: 129, blue: 255, rgb: 'rgb(81,129,255)'}));
        });
    });

    // compareColors ( firstColor, secondColor, backgroundColor )
    describe('Compare the contrast between two colors', function() {
        it('First color visible rgb(), second color visible rgb()', function() {
            expect(colorContrast.compareColors('rgb(0, 112, 105)', 'rgb(255, 255, 255)')).toBe(5.96);
        });
        it('First color visible #hex, second color visible #hex', function() {
            expect(colorContrast.compareColors('#007069', '#fff')).toBe(5.96);
        });
        it('First color visible rgb(), second color semi-transparent rgba(), background color visible', function() {
            expect(colorContrast.compareColors('rgb(60, 0, 112)', 'rgba(255, 255, 255, 0.8)', 'rgb(0, 0, 0)')).toBe(9.17);
        });
        it('First color semi-transparent rgba(), second color visible rgb(), background color visible', function() {
            expect(colorContrast.compareColors('rgba(0, 112, 105, 0.9607843137254902)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)')).toBe(5.48);
        });
        it('First color visible rgb(), second color semi-transparent #hex, background color visible', function() {
            expect(colorContrast.compareColors('rgb(60, 0, 112)', '#ffffffcc', 'rgb(0, 0, 0)')).toBe(9.17);
        });
        it('First color semi-transparent #hex, second color visible rgb(), background color visible', function() {
            expect(colorContrast.compareColors('#007069f5', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)')).toBe(5.48);
        });
    });

    // compareElements ( fontSize, fontWeight, fontColor, backgroundColor, parentBackgroundColor, parentFontWeight )
    describe('Determine if the text passes or fails WCAG20 G18', function() {
        it('Comparison standard', function() {
            expect(colorContrast.compareElements('12px', 'normal', 'rgb(0, 112, 105)', 'rgb(255, 255, 255)')).toEqual(jasmine.objectContaining({levelAA: true, levelAAA: false, contrastRatio: 5.96, recomendations: 'Contrast to low, you should increase/decrease font color or background color.'}));
        });
        it('Comparison with semi-transparent background', function() {
            expect(colorContrast.compareElements('12px', 'normal', 'rgb(0, 112, 105)', 'rgba(255, 255, 255, 0.8)', 'rgb(0, 0, 0)')).toEqual(jasmine.objectContaining({levelAA: false, levelAAA: false, contrastRatio: 3.71, recomendations: 'Contrast to low, you should increase/decrease font color or background color.'}));
        });
        it('Comparison with a lighter font weight', function() {
            expect(colorContrast.compareElements('18px', 'lighter', 'rgb(0, 12, 105)', 'rgba(255, 255, 255, 0.8)', 'rgb(255, 255, 255)', '800')).toEqual(jasmine.objectContaining({levelAA: true, levelAAA: true, contrastRatio: 16.71, recomendations: ''}));
        });
        it('Comparison with a relative font size', function() {
            expect(colorContrast.compareElements('2em', 'lighter', 'rgb(0, 72, 205)', 'rgba(255, 255, 255, 0.8)', 'rgb(255, 255, 255)', '800', '12px')).toEqual(jasmine.objectContaining({levelAA: true, levelAAA: true, contrastRatio: 7.48, recomendations: ''}));
        });
    });
    
});