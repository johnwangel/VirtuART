var myApp = angular.module("myApp");

myApp.controller("ToolkitController", [
  "$scope",
  "ToolkitService",
  function($scope, ToolkitService) {
    $scope.image = "";

    $scope.brushes = {
      small: true,
      medium: false,
      large: false
    }

    $scope.colors = {
      red: false,
      orange: false,
      yellow: false,
      green: false,
      blue: false,
      black: true,
    }

    $scope.currentColor = "black";
    $scope.currentStrokeWidth = '4';
    $scope.transparency = 1;

    ToolkitService.getCanvas().then(thisCanvas => {
      $scope.image = thisCanvas;
      window.atra();
    });

    $scope.getPNG = function() {
      var canvas = document.getElementById("canvas");
      var image = canvas.toDataURL('image/png', 1.0);
      ToolkitService.postImage(image).then(result => {
        console.log("Results from GET PNG ", result);
      });



    $scope.setColor = function (target, color) {
      for (var x in $scope.colors){
        $scope.colors[x] = false;
      }

      $scope.colors[target] = true;
      let newColor = ToolkitService.setColor(color);
      $scope.currentColor = newColor;
    }


    $scope.setStrokeWidth = function (target, width) {
      let newStrokeWidth = ToolkitService.setStrokeWidth(width);
      $scope.currentStrokeWidth = newStrokeWidth;
      console.log('from controller scope width', $scope.currentStrokeWidth);

      for (var x in $scope.brushes){
        $scope.brushes[x] = false;
      }

      $scope.brushes[target] = true;

      console.log('here are our brushes', $scope.brushes);

    }

    $scope.setTransparency = function (transparency) {
      let newTransparency = ToolkitService.setTransparency(transparency);
      $scope.transparency = newTransparency;
      console.log('new transparency', newTransparency);
    }

    return ToolkitService.getCanvas().then(thisCanvas => {
      console.log(thisCanvas);
      $scope.image = thisCanvas;
      window.atra();
    });

  }
]);
