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
      $scope.photoURLs = allData.tiles;
      console.log('this is scope photo urls', $scope.photoURLs);
      console.log('this is allData', allData);
      window.disableCamera();
    });
  }
]);