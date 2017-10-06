angular.module("myApp").service("UsersService", [ "$http", function($http) {

    const userInfo = { username: '', id: '', message: '' };

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

      function login(user) {
        const { username, password } = user;
        const credentials = {
          username: username,
          password: password
        };
        return $http({
          method: 'POST',
          url: '/api/login/',
          data: credentials
        })
        .then( user => {
          userInfo.username = user.data.username;
          userInfo.id = user.data._id;


          return user.data;
        })
        .catch( err => {
          userInfo.username = '';
          userInfo.id = '';
          userInfo.message = "Username/Password combo not recognized.";
          return err.data;
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
        .then( result => {
          if (result.data.userExists){
            userInfo.username = '';
            userInfo.id = '';
            userInfo.message = 'That username is taken. Please choose a different username.';
            return result.data;
          }
          userInfo.username = result.data.username;
          userInfo.id = result.data._id;
          userInfo.message = '';
          return result.data;
        });
      }

      function logoutUser(){
        userInfo.username = '';
        userInfo.id = '';
        return userInfo;
      }

    return {
      userInfo : userInfo,
      getTiles: getTiles,
      checkTile: checkTile,
      getHistory: getHistory,
      login: login,
      register: register,
      logoutUser: logoutUser
    };
  }
]);
