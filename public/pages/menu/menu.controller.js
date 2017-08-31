var myApp = angular.module('myApp');

myApp.controller('MenuController', ['$scope', '$window', function($scope, $window) {
    $scope.accessRegisterPage = function(){
      console.log('we are in our menu method');
        $window.location.href = '/register';
    };
  }]);