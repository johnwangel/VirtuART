angular.module("myApp").service("UsersService", [ "$http", function($http) {

    const userInfo = { username: '', id: '' };

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

      function getHistory(){
        return $http.get('/api/history/')
        .then( historyData => {
          console.log("HISTORY FROM GET HISTORY ", historyData.data )
          return historyData.data;
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
        return $http({
          method: 'POST',
          url: '/api/register/',
          data: {
                  username : user.username,
                  password : user.password
                }
        })
        .then( user => {
          userInfo.username = user.data.username;
          userInfo.id = user.data._id;
          return user.data;
        });
      }

    return {
      userInfo : userInfo,
      getTiles: getTiles,
      checkTile: checkTile,
      getHistory: getHistory,
      login: login,
      register: register
    };
  }
]);
