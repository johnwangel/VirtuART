var myApp = angular.module('myApp');

myApp.controller(
  'RegisterController', ['$scope', '$location', 'UsersService', function($scope, $location, UsersService) {
  window.disableCamera();

  $scope.register = function() {
      UsersService.register($scope.user)
    .then(user => {
      $location.path('/home');
    });
  };
}]);