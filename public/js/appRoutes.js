angular.module('roues.module', [])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController'
            })
            .when('/geeks', {
                templateUrl: 'views/geeks.html',
                controller: 'GeekController'
            })
            .when('/nerds', {
                templateUrl: 'views/nerds.html',
                controller: 'NerdController'
            });

        $locationProvider.html5Mode(true);

    }]);