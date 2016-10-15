(function() {
    'use strict';

    angular
        .module('hueApp')
        .directive('colorPicker', function(colorConvertService, hueService) {
            return {
                restrict: 'A',
                scope: {
                    item: '@',
                    light: '@',
                    color: '@'
                },
                controller: 'hueLightController',
                templateUrl: './views/colorPicker.html',
                link: function(scope, element) {
                    scope.colorPickerVisible = false;
                    scope.colorHex = scope.color;
                    scope.colorInputStyle = { 'background-color': scope.color };
                    scope.canvasId = scope.item + '_' + scope.light;
                    var canvas = element[0].children[3].children[1].getContext('2d');
                    var img = new Image();
                    img.src = './assets/img/image.jpg';

                    $(img).load(function() {
                        canvas.drawImage(img, 0, 0, 300, 300);
                    });

                    scope.showColorPicker = function() {
                        scope.colorPickerVisible = true;
                    };

                    scope.hideColorPicker = function() {
                        scope.colorPickerVisible = false;
                    };

                    scope.selectColor = function($event) {
                        var x = event.pageX - $('#' + scope.canvasId).offset().left;
                        var y = event.pageY - $('#' + scope.canvasId).offset().top;
                        var img_data = canvas.getImageData(x, y, 1, 1).data;
                        var R = img_data[0];
                        var G = img_data[1];
                        var B = img_data[2];
                        var rgb = { red: R, green: G, blue: B };
                        scope.colorHex = '#' + colorConvertService.rgbToHex(R, G, B);
                        var xy = { "xy": colorConvertService.RGBtoXY(rgb) };
                        scope.colorInputStyle = { 'background-color': scope.colorHex };
                        hueService.changeColor(scope.item, scope.light, xy);
                    };
                }
            };
        });
})();
