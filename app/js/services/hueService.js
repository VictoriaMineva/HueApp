(function() {
    'use strict';

    angular.module('hueApp')
        .factory('hueService', function($http) {
            var baseURL = 'http://192.168.178.87/api/kvKcUG7IhRUSTBuXSBO4mMZtZ77Loe0RO58Se7Mw/';
            var hueFactory = {};

            hueFactory.getLights = function() {
                return $http.get(baseURL + "lights");
            };

            hueFactory.getGroups = function() {
                return $http.get(baseURL + "groups");
            };

            hueFactory.turnOn = function(light, settings) {
                return $http.put(baseURL + "lights/" + light + "/state", settings);
            };

            hueFactory.turnOnAll = function(group, settings) {
                return $http.put(baseURL + "groups/" + group + "/action", settings);
            };

            hueFactory.changeColor = function(item, light, settings) {
                if (item == "groups") {
                    return $http.put(baseURL + "groups/" + light + "/action", settings);
                } else {
                    return $http.put(baseURL + "lights/" + light + "/state", settings);
                }
            };

            hueFactory.changeGroupColor = function(group, settings) {
                return $http.put(baseURL + "groups/" + group + "/action", settings);
            }

            hueFactory.loopColors = function(settings) {
                return $http.put(baseURL + "groups/0" + "/action", settings);
            };

            hueFactory.adjustBrightness = function(settings) {
                return $http.put(baseURL + "groups/0" + "/action", settings);
            };

            hueFactory.adjustSaturation = function(settings) {
                return $http.put(baseURL + "groups/0" + "/action", settings);
            };

            return hueFactory;
        });

})();
