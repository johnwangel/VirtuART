angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/userHome', {
          templateUrl: 'home.html',
          //MODIFY THIS WITH NEW HOME CONTROLLER???
          controller: 'MainHomeController'
        })
        .otherwise({ redirectTo: '/' });
      $locationProvider.html5Mode(true);
    }
  ])
  .run([
    '$rootScope',
    'APP_VERSION',
    function($rootScope, APP_VERSION) {
      console.log('running');
      $rootScope.version = APP_VERSION;
    }
  ]);