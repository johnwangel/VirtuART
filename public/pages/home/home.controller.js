/*jshint esversion:6 */
console.log('the home controller is running now');

var myApp = angular.module('myApp');

myApp.controller('MainHomeController', [
  '$scope',
  'UsersService',
  function($scope, UsersService) {
    console.log('inside the function - the home controller is running now');

    var canvasContainer = document.getElementById("canvasContainer");

    console.log('INSIDE HOME CONTROLLER canvas element grabbed', canvasContainer);

    $scope.currentPhotos = [];

    return UsersService.goHome()
    .then(photoData => {
      // console.log('from our controller - photo data', photoData);
      window.augreal(photoData);
    });
  }
]);