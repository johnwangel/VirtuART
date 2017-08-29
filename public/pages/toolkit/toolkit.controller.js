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
          ToolkitService.postImage(image).then(result => {
            console.log(result);
          });
        };

<<<<<<< HEAD


    return ToolkitService.getCanvas().then(thisCanvas => {
        $scope.image = thisCanvas;
        window.atra();
      });
  }
]);
=======
       return ToolkitService.getCanvas().then(thisCanvas => {
          console.log(thisCanvas);
          $scope.image = thisCanvas;
          window.atra();
        });
      }
  ]);
>>>>>>> d1fde5070f3b8f608377927a420700f67e031aef
