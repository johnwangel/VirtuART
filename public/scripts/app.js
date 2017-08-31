angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '../pages/home/home.html',
          controller: 'MainHomeController'
        })
        .when('/toolkit', {
          templateUrl: '../pages/toolkit/toolkit.html',
          controller: 'ToolkitController'
        })
        .when('/register',{
          templateURl:'../pages/register/register.html',
          controller:'RegisterController'
        })
        .when('/login', {
          templateUrl:'../pages/login/login.html',
          controller:'LoginController'
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