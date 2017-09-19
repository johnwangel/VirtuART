
angular.module('myApp');
myApp.controller(
  'LoginController', ['$scope', 'UsersService', function($scope, UsersService) {
  $scope.user = { username: '', id: '' };
  window.disableCamera();

 $scope.login = function() {
    UsersService.login($scope.user)
    .then(users=>{
      $scope.users.username = users.username;
      $scope.users.id = users._id;
    });
  };
}]);