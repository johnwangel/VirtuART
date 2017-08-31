/*jshint esversion:6 */
// console.log('the home controller is running now');

var myApp = angular.module('myApp');

myApp.controller('MainHomeController', [
  '$scope',
  'UsersService',
  function($scope, UsersService) {
    $scope.currentPhotos = [];
    return UsersService.getTiles()
    .then(photoData => {
      let urlList = photoData.tiles.map( allTiles => {
        return allTiles.url;
      });
      window.augreal(urlList);
    });
  }
]);