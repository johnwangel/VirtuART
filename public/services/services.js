angular.module("myApp").service("UsersService", [ "$http", function($http) {

    function getTiles(){
        return $http.get('/api/home')
        .then( allImages => {
          return allImages.data;
        })
      }

      function checkTile(thisID){
        return $http({
          method: 'POST',
          url: '/api/toolkit/',
          data: { id: thisID }
        })
        .then( edit => {
          return edit.data;
        })
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

      function register(user) {
        console.log("this is the user we are receiving on our register service", user);
        return $http.post('/api/register').then(Users => {
          console.log(Users);
          return Users.data;
        });
      }

    return {
      getTiles: getTiles,
      checkTile: checkTile,
      login: login,
      register: register
    };
  }
]);