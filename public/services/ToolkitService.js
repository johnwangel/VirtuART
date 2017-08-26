angular.module('myApp')
.service('ToolkitService', ['$http', function($http) {

    function getCanvas() {
      return $http.get('/api/toolkit')
      .then( canvas => {
        return canvas.data;
      })
    }

    return {
      getCanvas: getCanvas
    };
  }
]);