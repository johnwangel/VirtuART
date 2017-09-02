var myApp = angular.module('myApp');

myApp.controller('MenuController', ['$scope', '$location', '$window', function($scope, $location, $window) {

    $scope.menuOpen = false;
    $scope.fixedNeeded = false;

    $scope.toggleMenu = function(){

      if ($location.path() === '/toolkit'){
        console.log('recognized as toolkit');
        $scope.fixedNeeded = true;
      } else {
        $scope.fixedNeeded = false;
      }


      if ($scope.menuOpen === true){
        $scope.menuOpen = false;
      } else {
        $scope.menuOpen = true;
      }
    };

    $scope.hideMenu = function() {
      if ($scope.menuOpen === true){
        $scope.menuOpen = false;
      }
    }
  }]);