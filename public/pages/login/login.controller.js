var myApp = angular.module('myApp');

myApp.controller(
  'LoginController', ['$scope', 'LoginService', function($scope, LoginService) {
  $scope.newLogin = { username: '', password: '' };

  $scope.LoginService = LoginService;
  $scope.login = function() {
    LoginService.login($scope.newLogin.username, $scope.newLogin.password)
   .then(credentials=>{
    $scope.newLogin.username = '';
    $scope.newLogin.password = '';
   });

  };
}]);