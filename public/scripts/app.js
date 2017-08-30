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

      var rect = element[0].getBoundingClientRect();
      console.log('this is RECT', rect);

      var scaleX = element[0].width/rect.width;
      var scaleY = element[0].height/rect.height;


      console.log('element width', element[0].width);
      console.log('element height', element[0].height);
      console.log('scale x', scaleX);
      console.log('scale y', scaleY);

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

        console.log('triggered touch staart');

        lastX = (event.touches[0].clientX - rect.left)*scaleX;
        lastY = (event.touches[0].clientY - rect.top)*scaleY;

        console.log('current X', lastX);
        console.log('current Y', lastY);

        // begins new line
        ctx.beginPath();

        drawing = true;

      });

      element.bind('click', function(event){
        console.log('click registered');
        console.log('this event on click', event);

        lastX = (event.clientX - rect.left)*scaleX;
        lastY = (event.clientY - rect.top)*scaleY;

        ctx.fillRect (lastX, lastY, 5, 5);

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
          console.log('triggered touch move');
          // get current mouse position
          console.log('this is event', event);
          currentX = (event.changedTouches[0].clientX - rect.left) * scaleX;
          currentY = ((event.changedTouches[0].clientY - rect.top) * scaleY);

          console.log('scale y from touchmove', scaleY);

          console.log('current X', currentX);
          console.log('current Y', currentY);


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
        console.log('triggered touch end');
        drawing = false;
      });

      // canvas reset
      function reset(){
       // element[0].width = element[0].width;
       // online said not to use above
       ctx.clearRect(0, 0, element[0].width, element[0].height);
      }

      function draw(lX, lY, cX, cY){
        // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color

        if (scope.brushes.eraser === true){
          ctx.globalCompositeOperation = 'destination-out';
          ctx.strokeStyle = 'rgba(0,0,0,1)';
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = scope.currentColor;
        }


        ctx.lineWidth = scope.currentStrokeWidth;

        // ctx.globalAlpha = 0.1;

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