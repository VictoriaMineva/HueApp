(function() {
    'use strict';

    angular.module('hueApp')
        .controller('hueLightController', function($scope, hueService, colorConvertService, $interval) {

            hueService.getLights().then(function(response) {
                $scope.lights = response.data;
                for (var key in $scope.lights) {
                    $scope.lights[key].lightColor = colorConvertService.xyBriToRgb($scope.lights[key].state.xy[0], $scope.lights[key].state.xy[1], $scope.lights[key].state.bri);
                    $scope.lights[key].hex = $scope.lights[key].lightColor;
                }
            });

            hueService.getGroups().then(function(response) {
                $scope.groups = response.data;
                for (var key in $scope.groups) {
                    $scope.groups[key].lightColor = colorConvertService.xyBriToRgb($scope.groups[key].action.xy[0], $scope.groups[key].action.xy[1], $scope.groups[key].action.bri);
                    $scope.groups[key].hex = $scope.groups[key].lightColor;
                }
            });

            $scope.colorLoopOn = false;
            $scope.key = 1;
            $scope.hex = "#BADA55";

            $scope.showPopup = false;

            $scope.loopColor = 0;
            var effectColor = 0;

            $scope.mycolor = "#BADA55";

            $scope.startLoop = function() {
                $scope.colorLoopOn = !$scope.colorLoopOn;

                if ($scope.colorLoopOn) {
                    $scope.interval = $interval(loopColors, 1000);
                } else {
                    $interval.cancel($scope.interval);
                }
            }

            $scope.stopLoop = function() {
                $interval.cancel($scope.interval);
            };

            function loopColors() {
                var settings = { "hue": $scope.loopColor };
                hueService.loopColors(settings);

                $scope.loopColor += 800;

                if ($scope.loopColor >= 65280) {
                    $scope.loopColor = 0;
                }
            }

            $scope.adjustBrightness = function(key) {
                var settings = { "bri": parseInt($scope.groups[key].action.bri) };
                hueService.adjustBrightness(settings);
            };

            $scope.adjustSaturation = function(key) {
                var settings = { "sat": parseInt($scope.groups[key].action.sat) };
                hueService.adjustSaturation(settings);
            };

            $scope.changeState = function(light) {
                var settings = { "on": $scope.lights[light].state.on };
                hueService.turnOn(light, settings);
            };

            $scope.changeGroupState = function(group) {
                console.log($scope.groups[group].action.on);
                var settings = { "on": $scope.groups[group].action.on };
                hueService.turnOnAll(group, settings);
            };

            //$scope.interval2 = $interval(effect, 1000);

            function effect() {
                var settings = { "hue": effectColor };
                hueService.changeColor('lights', 1, settings);
                if (effectColor == 0) {
                    effectColor = 46920;
                } else {
                    effectColor = 0;
                }
                settings = { "hue": effectColor };
                hueService.changeColor('lights', 2, settings);
                hueService.changeColor('lights', 3, settings);
            }
        });
})();
