/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('HowToUseController', [
  '$scope',
  'UsersService',
  function($scope, UsersService){
    window.disableCamera();
  }
]);