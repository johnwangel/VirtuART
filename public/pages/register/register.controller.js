var myApp = angular.module('myApp');


myApp.controller(
  'RegisterController', ['$scope', 'RegisterService', function($scope, RegisterService) {
  $scope.newUser = { username: ''};
  $scope.users = {username:'', password:''};
  $scope.RegisterService = RegisterService;
  $scope.register = function() {
    let newRegister = {
      username: $scope.newUser.username
    };


    RegisterService.register(newRegister);
    RegisterService.register($scope.users)
    .then(user=>{
      $scope.newRegister.username = '';
      $scope.users.username ='';
    $scope.users.password = '';
    });



  };
}]);