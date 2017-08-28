var myApp = angular.module('myApp');

myApp.controller('ToolkitController', [
  '$scope',
  'ToolkitService',
  function($scope, ToolkitService) {

    $scope.image = '';
    $scope.getPNG = function() {
          // var sketcher = atrament("#sketcher");
          var canvas = document.getElementById("canvas");
          var image = canvas.toDataURL('image/png', 1.0);
          console.log(image);

          ToolkitService.postImage(image).then(result => {
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
