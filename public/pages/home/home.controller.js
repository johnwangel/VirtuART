/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('MainHomeController', [
  '$scope',
  'UsersService',
  function($scope, UsersService) {
    $scope.currentPhotos = [];

    return UsersService.goHome()
    .then(photoData => {
      // console.log('from our controller - photo data', photoData);
      window.augreal(photoData);
    });
  }
]);