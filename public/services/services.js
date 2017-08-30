angular.module('myApp')
.service('UsersService', ['$http', function($http) {

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

  return {
    getTiles: getTiles,
    checkTile: checkTile
  };
}]);