/*jshint esversion:6 */

angular.module('myApp').service('UsersService', [
  '$http',
  function($http) {
    function getUsers() {
      return $http({ method: 'GET', url: '/api/users/' }).then(allUsers => {
        console.log(allUsers);
        return allUsers.data;
      });
    }

    function getUserHome(id) {
      return $http({
        method: 'GET',
        url: `/api/users/${id}`
      }).then(allUsers => {
        return allUsers.data;
      });
    }

    function createUser(username, password) {
      return $http({
        method: 'POST',
        url: '/api/users/',
        data: { username: username, password: password }
      }).then(currUser => {
        return currUser.data;
      });
    }

    function loginUser(username, password) {
      return $http({
        method: 'POST',
        url: '/api/users/login',
        data: { username: username, password: password }
      }).then(currUser => {
        console.log(currUser);
        return currUser.data;
      });
    }

    return {
      getUsers: getUsers,
      getUserHome: getUserHome,
      createUser: createUser,
      loginUser: loginUser
    };
  }
]);