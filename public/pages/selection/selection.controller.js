/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('SelectionController', [
  '$scope',
  '$location',
  'UsersService',
  function($scope, $location, UsersService) {
    $scope.photoURLs;

    $scope.loadCanvas = function(e){
      let thisID = e.path[0].id;
      localStorage.setItem('currentID', thisID);
        UsersService.checkTile(thisID)
        .then( response => {
          if (response == false ){
            alert('Sorry, that canvas is taken. Please select a different one.')
          } else {
            $location.path('/toolkit');
          }
      })
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