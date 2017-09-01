var myApp = angular.module("myApp");

myApp.controller("ToolkitController", [
  "$scope",
  "$location",
  "$window",
  "ToolkitService",
  "$timeout",
  function($scope, $location, $window, ToolkitService, $timeout) {
    $scope.image = "";

    $scope.drawingStateArr = [];

    $scope.redrawImg = '';

    $scope.lastBrush = 'small';
    $scope.lastColor = 'black'

    $scope.modalShow = false;

    $scope.progressActive = false;

    $scope.brushes = {
      small: true,
      medium: false,
      large: false,
      eraser: false
    };

    $scope.colors = {
      red: false,
      orange: false,
      yellow: false,
      green: false,
      saddlebrown: false,
      black: true,
      purple: false,
      violet: false,
      deeppink: false,
      aqua: false,
      lightseagreen: false,
      white: false
    };

    $scope.currentColor = 'black';
    $scope.currentId = '';
    $scope.currentStrokeWidth = '4';
    $scope.transparency = 1;

    ToolkitService.getCanvas().then(thisCanvas => {
      $scope.image = thisCanvas;
      window.disableCamera();
    });

    $scope.getPNG = function() {

      var canvas = document.getElementById("canvas");
      var image = canvas.toDataURL('image/png', 1.0);
      ToolkitService.postImage(image).then(result => {
        console.log(result);
      });

      $scope.modalShow = true;
      $scope.progressActive = true;

      $timeout(function(){
        // $scope.modalShow = false;
        // console.log('modal show', $scope.modalShow);
        $window.location.href = '/';
      }, 1800);
    };

    $scope.setColor = function (target, color) {
      for (var x in $scope.colors){
        $scope.colors[x] = false;
      }

      $scope.colors[target] = true;
      let newColor = ToolkitService.setColor(color);
      $scope.currentColor = newColor;

      if ($scope.brushes.eraser === true){
        $scope.setStrokeWidth($scope.lastBrush);
      }

      $scope[$scope.lastBrush] = true;
    }


    $scope.setStrokeWidth = function (target) {
      let newStrokeWidth = ToolkitService.setStrokeWidth(target);
      $scope.currentStrokeWidth = newStrokeWidth;
      console.log('from controller scope width', $scope.currentStrokeWidth);

      for (var x in $scope.brushes){
        $scope.brushes[x] = false;
      }

      $scope.brushes[target] = true;

      if(target !== 'eraser') {
        $scope.lastBrush = target;
      }

      console.log('here are our brushes', $scope.brushes);

    }

    $scope.setTransparency = function (transparency) {
      let newTransparency = ToolkitService.setTransparency(transparency);
      $scope.transparency = newTransparency;
      console.log('new transparency', newTransparency);
    }

    $scope.cancel = function(){
      console.log('firing the cancel method on selection controller');
      $window.location.href = '/';
      //function to user service to update flag to make the tile available
      //and set url for the tile to claim me
    }

    $scope.clearCanvas = function(){
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    $scope.setCurrentId = function(id) {
      $scope.currentId = id;
    }

    $scope.undo = function(){
      console.log('undo method firing');

      if ($scope.drawingStateArr.length > 1){
        $scope.drawingStateArr.pop();

        let previousState = $scope.drawingStateArr[$scope.drawingStateArr.length - 1];

        let canvas = document.getElementById("canvas");

        let ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.putImageData(previousState, 0, 0);

      }
    }

    return ToolkitService.getCanvas().then(thisCanvas => {
      $scope.image = thisCanvas;
      window.disableCamera();
    });

  }
]);