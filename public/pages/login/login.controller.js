
angular.module('myApp');
myApp.controller(
  'LoginController', ['$scope', '$rootScope', '$location', 'UsersService', 'ToolkitService', function($scope, $rootScope, $location, UsersService, ToolkitService) {
  $scope.user = { username: '', password: '', message: '' };
  window.disableCamera();

 $scope.login = function() {
    UsersService.login( $scope.user )
    .then( result => {
      if (!result.success === null || result.success === false){
        return;
      }

      if ($rootScope.imageDrawn === true) {
        ToolkitService.postImage($rootScope.imageForDB).then(result => {
          localStorage.setItem('currentID', '');
          $rootScope.imageForDB = '';
          $rootScope.imageDrawn = false;
        });
      }

      $location.path('/home');
    });
  };

  return $scope.user.message = UsersService.userInfo.message;

}]);