angular.module("myApp").service("UsersService", [
  "$http",
  function($http) {
    function goHome() {
      return $http.get('/api/home').then(allImages => {
        console.log("this is from our service ", allImages);
        return allImages.data;
      });
    }

    function login(username, password) {
      console.log('login');
      const credentials = {
        username: username,
        password: password
      };
      return $http.post('/api/login').then(allUsers => {
        console.log('this is our users', allUsers);
        return allUsers.data;
      });
    }

    function register(username, password) {
      console.log(register);
      return $http.post('/register').then(Users => {
        console.log(Users);
        return Users.data;
      });
    }

    return {
      goHome: goHome,
      login: login,
      register: register
    };
  }
]);
