
angular.module('myApp');
myApp.controller(
  'LoginController', ['$scope', '$location', 'UsersService', function($scope, $location, UsersService) {
  $scope.user = { username: '', password: '', message: '' };
  window.disableCamera();

 $scope.login = function() {
    UsersService.login( $scope.user )
    .then( result => {
      if (result.success === false){
        $scope.user.message = UsersService.userInfo.message;
        return;
      }
      $location.path('/home');
    });
  };
}]);