
angular.module('myApp');
myApp.controller(
  'LoginController', ['$scope', '$location', 'UsersService', function($scope, $location, UsersService) {
  $scope.user = { username: '', password: '' };
  window.disableCamera();

 $scope.login = function() {
    UsersService.login( $scope.user )
    .then(user => {
      $location.path('/home');
    });
  };
}]);