/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('SelectionController', [
  '$scope',
  '$location',
  'UsersService',
  'ToolkitService',
  function($scope, $location, UsersService, ToolkitService) {
    $scope.photoURLs;

    $scope.loadCanvas = function(e){
      let thisID = e.path[0].id;
        UsersService.checkTile(thisID)
        .then( response => {
          if (response == false ){
            alert('Sorry, that canvas is taken. Please select a different one.')

          } else {
            ToolkitService.setCurrentId(response);
            $location.path('/toolkit');
          }
      })
    }

    return UsersService.getTiles()
    .then(allData => {
      $scope.photoURLs = allData.tiles;
      window.disableCamera();
    });
  }
]);