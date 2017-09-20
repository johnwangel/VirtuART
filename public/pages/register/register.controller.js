var myApp = angular.module('myApp');

myApp.controller(
  'RegisterController', ['$scope', '$location', 'UsersService',
  function($scope, $location, UsersService) {

    $scope.user = { username: '', password: '', message: '' }
    window.disableCamera();

    $scope.register = function() {
      UsersService.register($scope.user)
      .then( result => {
        if ( result.userExists ){
          $scope.user.message = UsersService.userInfo.message;
          return;
        }
        $location.path('/home');
      });
    };

}]);