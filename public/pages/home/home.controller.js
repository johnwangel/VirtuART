/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('MainHomeController', [
  '$scope',
  '$filter',
  'UsersService',
  function($scope, $filter, UsersService) {
    $scope.userData = [];

    return UsersService.getUserHome(
      window.localStorage.getItem('authorID')
    ).then(userData => {
      $filter('orderBy')(userData.messages, 'createdAt');
      console.log(userData);
      $scope.userData = userData;
    });
  }
]);