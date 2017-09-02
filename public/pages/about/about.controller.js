/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('AboutController', [
  '$scope',
  'UsersService',
  function($scope, UsersService){
    console.log('DISABLE CAMERA runs')
    window.disableCamera();
  }
]);