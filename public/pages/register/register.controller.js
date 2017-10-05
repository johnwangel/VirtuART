var myApp = angular.module('myApp');

myApp.controller(
  'RegisterController', ['$scope', '$rootScope', '$location', 'UsersService', 'ToolkitService',
  function($scope, $rootScope, $location, UsersService, ToolkitService) {

    $scope.user = { username: '', password: '', message: '' }
    window.disableCamera();

    $scope.register = function() {

      UsersService.register($scope.user)
      .then( result => {
        if ( result.userExists ){
          $scope.user.message = UsersService.userInfo.message;
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

}]);