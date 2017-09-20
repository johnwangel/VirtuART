var myApp = angular.module('myApp');

myApp.controller(
  'LogoutController', ['$scope', '$location', 'UsersService',
  function($scope, $location, UsersService){

    $scope.user = { username: '', password: '' }
    window.disableCamera();

    return UsersService.logoutUser();
}]);