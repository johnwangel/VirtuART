/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('SelectionController', [
  '$scope',
  '$location',
  'UsersService',
  function($scope, $location, UsersService) {
    $scope.photoURLs;

    $scope.alertModalShow = false;

    $scope.loadCanvas = function(e){
      let thisID = e.target.id;
      localStorage.setItem('currentID', thisID);

      return UsersService.checkTile(thisID)
        .then(response => {
          console.log('coming back from check tile service', response);
          //but - backend still returns id if "in progresss" - need it to return false if saved or if in progress - in both scenarios.
          if (response === 'false'){
            $scope.alertModalShow = true;
          } else {
            $location.path('/toolkit');
          }
      })
    }

    $scope.refresh = function() {
      $scope.alertModalShow = false;
      $location.path('/selection');
    }

    return UsersService.getTiles()
    .then(allData => {
      let currScene = allData.filter( scene => scene.status === "current" )[0];
      let interScene = allData.filter( scene => scene.status === "intermediate" )[0];
      if (interScene) {
        $scope.photoURLs = interScene.tiles;
      } else {
        $scope.photoURLs = currScene.tiles;
      }
      window.disableCamera();
    });
  }
]);