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
        .when('/selection', {
          templateUrl: '../pages/selection/selection.html',
          controller: 'SelectionController'
        })
        .when('/toolkit', {
          templateUrl: '../pages/toolkit/toolkit.html',
          controller: 'ToolkitController'
        })
        .when('/history', {
          templateUrl:'../pages/history/history.html',
          controller:'HistoryController'
        })
        .when('/aboutus', {
          templateUrl:'../pages/about/about.html',
          controller:'AboutController'
        })
        .when('/howtouse', {
          templateUrl:'../pages/howtouse/howtouse.html',
          controller:'HowToUseController'
        })
        .when('/register', {
          templateUrl: '../pages/register/register.html',
          controller: 'RegisterController'
        })
        .when('/login', {
          templateUrl:'../pages/login/login.html',
          controller:'LoginController'
        })
        .otherwise({ redirectTo: '/' });
      $locationProvider.html5Mode(true);
    }
  ])
  .directive('drawing', [function(){
  return {
    restrict: "A",
    link: function(scope, element){

      var ctx = element[0].getContext('2d');

      var rect = element[0].getBoundingClientRect();

      var scaleX = element[0].width/rect.width;
      var scaleY = element[0].height/rect.height;


      // variable that decides if something should be drawn on mousemove
      var drawing = false;

      // the last coordinates before the current move
      var lastX;
      var lastY;

      var initialCanvasData = ctx.getImageData(0, 0, element[0].width, element[0].height);

        scope.drawingStateArr.push(initialCanvasData);

        console.log('state array length', scope.drawingStateArr.length);

      // var drawingState = element[0].toDataURL('image/png', 1.0);




      // console.log('initial drawing state', drawingState);

      // scope.stateArr.push(ctx.save());
      // console.log('initial stateArr', scope.stateArr);

      // scope.$watch('redrawImg', function() {
      //   console.log('changes in redrawImg detected');
      //   console.log('this is redrawImg', scope.redrawImg);
      //   ctx.clearRect(0, 0, canvas.width, canvas.height);

      //   ctx.drawImage(scope.redrawImg, 0, 0);
      // })

      element.bind('mousedown', function(event){

        lastX = event.offsetX;
        lastY = event.offsetY;

        // begins new line
        ctx.beginPath();

        drawing = true;

      });


      element.bind('touchstart', function(event){

        lastX = (event.touches[0].clientX - rect.left)*scaleX;
        lastY = (event.touches[0].clientY - rect.top)*scaleY;

        // begins new line
        ctx.beginPath();

        drawing = true;

      });

      element.bind('click', function(event){

        lastX = (event.clientX - rect.left)*scaleX;
        lastY = (event.clientY - rect.top)*scaleY;

        ctx.fillStyle = scope.currentColor;
        ctx.fillRect (lastX, lastY, 5, 5);

        // var newDrawingState = element[0].toDataURL('image/png');

        // scope.stateArr.push(newDrawingState);

        // console.log('now sopce array', scope.stateArr);

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

          currentX = (event.changedTouches[0].clientX - rect.left) * scaleX;
          currentY = ((event.changedTouches[0].clientY - rect.top) * scaleY);

          draw(lastX, lastY, currentX, currentY);

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
      });

      element.bind('mouseup', function(event){
        console.log('firing mouseup');
        // stop drawing
        drawing = false;

        // var newDrawingState = element[0].toDataURL('image/png');

        // console.log('new drawing state', newDrawingState);

        // scope.stateArr.push(newDrawingState);

        // console.log('now sopce array', scope.stateArr);

        var canvasData = ctx.getImageData(0, 0, element[0].width, element[0].height);

        var lastIndex = scope.drawingStateArr.length - 1;

        var lastState = scope.drawingStateArr[lastIndex];

        // if (JSON.stringify(canvasData) !== JSON.stringify(lastState)){
          scope.drawingStateArr.push(canvasData);
        // }



        // ctx.save();

      });

      element.bind('touchend', function(event){

        console.log('firing TOUCHEND');
        // stop drawing
        drawing = false;

        // var newDrawingState = element[0].toDataURL('image/png');

        // scope.stateArr.push(newDrawingState);



        // ctx.save();

        var canvasData = ctx.getImageData(0, 0, element[0].width, element[0].height);

        var lastIndex = scope.drawingStateArr.length - 1;

        var lastState = scope.drawingStateArr[lastIndex];

        // if (JSON.stringify(canvasData) !== JSON.stringify(lastState)){
          scope.drawingStateArr.push(canvasData);
        // }

        console.log('now sopce array length', scope.drawingStateArr.length);

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
  }
}]);