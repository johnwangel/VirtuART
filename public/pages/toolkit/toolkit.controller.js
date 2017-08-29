var myApp = angular.module('myApp');

myApp.controller('ToolkitController', [
  '$scope',
  'ToolkitService',
  function($scope, ToolkitService) {

    $scope.image = '';
    $scope.currentColor = "black";
    $scope.currentStrokeWidth = '4';
    $scope.transparency = 1;

    ToolkitService.getCanvas().then(thisCanvas => {
        $scope.image = thisCanvas;
        window.atra();
      });

    $scope.setColor = function (event, color) {
      let colorButtons = document.querySelectorAll(".color");
      colorButtons.forEach(button => {
        button.style.border = "none";
      })
      event.target.style.border = "2px solid white";
      let newColor = ToolkitService.setColor(color);
      $scope.currentColor = newColor;
    }

    $scope.setStrokeWidth = function (targetClass, width) {
      let newStrokeWidth = ToolkitService.setStrokeWidth(width);
      $scope.currentStrokeWidth = newStrokeWidth;
      console.log('from controller scope width', $scope.currentStrokeWidth);
      let brushButtons = document.querySelectorAll(".brush");
      brushButtons.forEach(button => {
        button.style.backgroundColor = 'grey';
      });
      let selectedWidth = document.querySelector('.'+targetClass);
      selectedWidth.style.backgroundColor = 'black';

    }

    $scope.setTransparency = function (transparency) {
      let newTransparency = ToolkitService.setTransparency(transparency);
      $scope.transparency = newTransparency;
      console.log('new transparency', newTransparency);
    }
  }
]);