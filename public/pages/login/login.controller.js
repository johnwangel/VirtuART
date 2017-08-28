var myApp = angular.module('myApp');

myApp.controller(
  'LoginController', ['$scope', 'LoginService', function($scope, LoginService) {
  $scope.newLogin = { username: '', password: '' };
  $scope.LoginService =LoginService;
  $scope.Login = function() {
    var newLogin = {
      username: $scope.newLogin.username,
      password: $scope.newLogin.password
    };
   LoginService.Login(newBook);
    $scope.Login.username = '';
    $scope.Login.password = '';
  };
}]);