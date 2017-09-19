
angular.module('myApp');
myApp.controller(
  'LoginController', ['$scope', 'UsersService', function($scope, UsersService) {
  $scope.user = { username: '', password: '' };
  window.disableCamera();

 $scope.login = function() {
    console.log("this is scope.user before calling login service", $scope.user);
    UsersService.login($scope.user)
    .then(users=>{
      console.log('this is users from controller', users);
      $scope.users.username = '';
      $scope.users.password = '';

    });
  };
}]);