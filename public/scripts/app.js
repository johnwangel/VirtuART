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

        .when('/login', {
          templateUrl: '../pages/login/login.html',
          controller: 'LoginController'
        })
        .when('/register', {
          templateUrl: '../pages/register/register.html',
          controller: 'RegisterController'
        })
        .when('/register', {
          templateUrl:'../pages/register/register.html',
          controller: ''
        })
        .when('/login', {
          templateUrl:'../pages/login/login.html',
          controller:'LoginController'

        })
        .otherwise({ redirectTo: '/' });
      $locationProvider.html5Mode(true);
    }
  ])
  .directive("drawing", function(){
  return {
    restrict: "A",
    link: function(scope, element){
      console.log('this is scope on drawing directive', scope);
      console.log('this is the element on drawing directive', element);
      var ctx = element[0].getContext('2d');

      // variable that decides if something should be drawn on mousemove
      var drawing = false;

      // the last coordinates before the current move
      var lastX;
      var lastY;

      element.bind('mousedown', function(event){

        lastX = event.offsetX;
        lastY = event.offsetY;

        // begins new line
        ctx.beginPath();

        drawing = true;
      });

      element.bind('touchstart', function(event){

        lastX = event.offsetX;
        lastY = event.offsetY;

        // begins new line
        ctx.beginPath();

        drawing = true;
      });

      element.bind('mousemove', function(event){
        if(drawing){
          // get current mouse position
          currentX = event.offsetX;
          currentY = event.offsetY;

          draw(lastX, lastY, currentX, currentY);

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
      });

      element.bind('touchmove', function(event){
        if(drawing){
          // get current mouse position
          currentX = event.offsetX;
          currentY = event.offsetY;

          draw(lastX, lastY, currentX, currentY);

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
      });

      element.bind('mouseup', function(event){
        // stop drawing
        drawing = false;
      });

      element.bind('touchend', function(event){
        // stop drawing
        drawing = false;
      });

      // canvas reset
      function reset(){
       element[0].width = element[0].width;
      }

      function draw(lX, lY, cX, cY){
        // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color
        ctx.strokeStyle = scope.currentColor;

        // ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
        // draw it

        ctx.lineWidth = scope.currentStrokeWidth;

        ctx.globalAlpha = 0.1;

        ctx.stroke();
      }
    }
  };
});
  // .run([
  //   '$rootScope',
  //   'APP_VERSION',
  //   function($rootScope, APP_VERSION) {
  //     console.log('running');
  //     $rootScope.version = APP_VERSION;
  //   }
  // ]);