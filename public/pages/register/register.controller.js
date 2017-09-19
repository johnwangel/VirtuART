var myApp = angular.module('myApp');

myApp.controller(
  'RegisterController', ['$scope', 'UsersService', function($scope, UsersService) {
  $scope.user= {username:'', password:''};
  window.disableCamera();

  $scope.register = function() {
    console.log("this is scope.user before calling register service.", $scope.user);
      UsersService.register($scope.user)
    .then(user=>{
      console.log("this is user from controller", user);
      $scope.user.username ='';
      $scope.user.password = '';

    });
  };
}]);