(function() {
    'use strict';

    angular.module('hueApp')
        .factory('colorConvertService', function() {
            var colorFactory = {};

            colorFactory.RGBtoXY = function(rgb) {
                var red = (rgb.red > 0.04045) ? Math.pow((rgb.red + 0.055) / (1.0 + 0.055), 2.4) : (rgb.red / 12.92);
                var green = (rgb.green > 0.04045) ? Math.pow((rgb.green + 0.055) / (1.0 + 0.055), 2.4) : (rgb.green / 12.92);
                var blue = (rgb.blue > 0.04045) ? Math.pow((rgb.blue + 0.055) / (1.0 + 0.055), 2.4) : (rgb.blue / 12.92);
                var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
                var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
                var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;
                var fx = X / (X + Y + Z);
                var fy = Y / (X + Y + Z);

                return [fx, fy];
            };

            colorFactory.xyBriToRgb = function(x, y, bri) {
                var z = 1.0 - x - y;
                var Y = bri / 255.0;
                var X = (Y / y) * x;
                var Z = (Y / y) * z;
                var r = X * 1.612 - Y * 0.203 - Z * 0.302;
                var g = -X * 0.509 + Y * 1.412 + Z * 0.066;
                var b = X * 0.026 - Y * 0.072 + Z * 0.962;
                r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
                g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
                b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
                var maxValue = Math.max(r, g, b);
                r /= maxValue;
                g /= maxValue;
                b /= maxValue;
                r = r * 255;
                if (r < 0) { r = 255 };
                g = g * 255;
                if (g < 0) { g = 255 };
                b = b * 255;
                if (b < 0) { b = 255 };

                return "#" + colorFactory.toHex(r) + colorFactory.toHex(g) + colorFactory.toHex(b);
            };

            colorFactory.toHex = function(c) {
                var hex = c.toString(16);
                var result = hex.length == 1 ? "0" + hex : hex;
                result = result.substring(0, 2);
                return result;
            };

            colorFactory.rgbToHex = function(R, G, B) {
                return colorFactory.toHex(R) + colorFactory.toHex(G) + colorFactory.toHex(B);
            };

            return colorFactory;
        });
})();
