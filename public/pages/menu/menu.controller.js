var myApp = angular.module('myApp');

myApp.controller('MenuController', ['$scope', '$location', '$window', 'UsersService',
  function($scope, $location, $window, UsersService) {

    $scope.menuOpen = false;
    $scope.fixedNeeded = false;
    $scope.userLoggedIn = false;
    $scope.user = UsersService.userInfo;

    $scope.toggleMenu = function(){

      console.log('USER FROM MENU ', $scope.user);

      if ($location.path() === '/toolkit'){
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