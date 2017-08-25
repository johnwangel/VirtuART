var myApp = angular.module('myApp');

myApp.controller('ToolkitController', [
  '$scope',
  'ToolkitService',
  function($scope, ToolkitService) {

    $scope.image = '';

    return ToolkitService.getCanvas().then(thisCanvas => {
        console.log(thisCanvas);
        $scope.image = thisCanvas;
      });
  }
]);