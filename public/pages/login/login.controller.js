angular.module('myApp')
.controller('LoginController', ['$scope', '$rootScope', 'UsersService', '$window', function($scope, $rootScope, UsersService, $window){
myApp.controller(
  'LoginController', ['$scope', 'LoginService', function($scope, LoginService) {
  $scope.newLogin = { username: '', password: '' };
  $scope.LoginService =LoginService;
  $scope.Login = function() {
    var newLogin = {
      username: $scope.newLogin.username,
      password: $scope.newLogin.password
    };
   LoginService.Login(newLogin);
    $scope.Login.username = '';
    $scope.Login.password = '';

  $scope.user = {
    username: '',
    password: ''
};

  };

  $scope.feedback = '';

  $scope.loginUser = function () {
    console.log('login function on controller running');
    console.log('this is the user we send', $scope.user);

    //any issues here with passing data securely?
    UsersService.loginUser($scope.user)
    .then(user => {
      console.log('came back to controller from loginUser method', user);
      if(!user) {$scope.feedback = 'Not a valid user'}
      else {
        localStorage.loggedInUserId = user.id;
        localStorage.loggedIn = true;
        $window.location.href='/users/' + user.id;
      }

    });

  };
}]);