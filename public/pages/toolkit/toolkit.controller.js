var myApp = angular.module("myApp");

myApp.controller("ToolkitController", [
  "$scope",
  "ToolkitService",
  function($scope, ToolkitService) {
    $scope.image = "";

    $scope.getPNG = function() {
      var sketcher = atrament("#sketcher");
      var url = sketcher.toImage();
      ToolkitService.postImage(url).then(result => {
        console.log(result);
      });
    };

    return ToolkitService.getCanvas().then(thisCanvas => {
      console.log(thisCanvas);
      $scope.image = thisCanvas;
      window.atra();
    });
  }
]);
