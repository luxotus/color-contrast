describe('colorContrast', () => {

    // alphaHex ( hex )
    describe("Alpha from hex", function() {
        it("100% Visible", function() {
            expect(colorContrast.alphaHex("0xFF")).toBe(1);
        });
        it("75% Visible", function() {
            expect(colorContrast.alphaHex("0xbf")).toBe(0.749);
        });
        it("50% Visible", function() {
            expect(colorContrast.alphaHex("0x80")).toBe(0.501);
        });
        it("25% Visible", function() {
            expect(colorContrast.alphaHex("0x40")).toBe(0.25);
        });
        it("0% Visible", function() {
            expect(colorContrast.alphaHex("0x00")).toBe(0);
        });
    });

    // hexToRgbA ( hex )

    // colorNamesToRGB ( colorName )

    // sizeToPx ( fontSize )

    // weightToNum ( fontWeight, parentWeight = 400 )

    // convertRGBAToRGB ( foregroundRGBA, backgroundRGB )

    // compareColors ( firstColor, secondColor, backgroundColor )

    // compareElements ( fontSize, fontWeight, fontColor, backgroundColor, parentBackgroundColor, parentFontWeight )
});