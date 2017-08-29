var myApp = angular.module('myApp');


myApp.controller(
  'RegisterController', ['$scope', 'RegisterService', function($scope, RegisterService) {
  $scope.newRegister = { username: '', password: '' };
  $scope.RegisterService =RegisterService;
  $scope.Register = function() {
    var newRegister = {
      username: $scope.newRegister.username,
      password: $scope.newRegister.password
    };
   RegisterService.Register(newUser);
    $scope.Register.username = '';
    $scope.Register.password = '';
  };
}]);