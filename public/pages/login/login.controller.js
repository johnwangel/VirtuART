
angular.module('myApp');
myApp.controller(
  'LoginController', ['$scope', 'UsersService', function($scope, UsersService) {
  $scope.user = { username: '', password: '' };
  window.disableCamera();

 $scope.login = function() {
    UsersService.login( $scope.user )
    .then(user => {
      console.log("USER FROM LOGIN", user);
    });
  };
}]);