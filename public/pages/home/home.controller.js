/*jshint esversion:6 */
// console.log('the home controller is running now');

var myApp = angular.module('myApp');

myApp.controller('MainHomeController', [
  '$scope',
  '$location',
  'UsersService',
  function($scope, $location, UsersService) {
    $scope.currentPhotos = [];

    $scope.addBtn = function() {
      $location.path('/selection');
    }

    return UsersService.getTiles()
    .then(photoData => {
      let currScene = photoData.filter( scene => scene.status === "current" )[0]
      let urlList = currScene.tiles.map( allTiles => {
        return allTiles.url;
      });
      window.augreal(urlList);
    });


  }
]);