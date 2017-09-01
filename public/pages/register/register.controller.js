var myApp = angular.module('myApp');

myApp.controller(
  'RegisterController', ['$scope', 'UsersService', function($scope, UsersService) {
  $scope.user= {username:'', password:''};
  $scope.register = function() {
    console.log("this is scope.user before calling register service.", $scope.user);
      UsersService.register($scope.user)
    .then(user=>{
      console.log("this is user from controller", user);
    $scope.user.username ='';
    $scope.user.password = '';
    //setting user id to local storage
    //if user does not come back
    });
  };
}]);
angular.module('myApp')
.controller('RegisterController', ['$scope', 'UsersService', function($scope, UsersService){

  $scope.user = {
    username: '',
    password: ''
  };

  $scope.successMsg = '';

  $scope.addUser = function () {

    console.log('this is the user we are sending from controller', $scope.user);

    UsersService.addUser($scope.user)
    .then(user => {
      console.log('came back to controller', user);
      $scope.user.username = '';
      $scope.user.password = '';
      $scope.successMsg = 'Registered!';
    });
  }
}])

