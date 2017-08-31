angular.module('myApp')
.service('UsersService', ['$http', function($http) {

  function getTiles(){
      return $http.get('/api/home')
      .then( allImages => {
        return allImages.data;
      })
  }



  return {
    getTiles: getTiles

  };
}]);