var myApp = angular.module('myApp');

myApp.controller('MenuController', ['$scope', '$window', function($scope, $window) {

    $scope.menuOpen = false;

    $scope.toggleMenu = function(){
      console.log('display menu running');

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