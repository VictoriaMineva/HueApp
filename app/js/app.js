(function() {
    'use strict';

    angular
        .module('hueApp', [
            'ngResource',
            'ngRoute',
            'ngTouch'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/overview.html',
                    controller: 'hueLightController'
                })
                .when('/lights', {
                    templateUrl: 'views/lights.html',
                    controller: 'hueLightController'
                })
                .when('/groups', {
                    templateUrl: 'views/groups.html',
                    controller: 'hueLightController'
                })
                .when('/test', {
                    templateUrl: 'views/test.html',
                    controller: 'hueLightController'
                })
                .otherwise({ redirectTo: '/' });
        }]);
})();
