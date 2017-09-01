/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('HistoryController', [
  '$scope',
  'UsersService',
  function($scope, UsersService) {
    $scope.historyData;

    return UsersService.getHistory()
    .then(historicalData => {
      $scope.historyData = historicalData;
      window.disableCamera();
    });
  }
]);