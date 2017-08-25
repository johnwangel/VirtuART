angular.module('myApp')
.service('ToolkitService', ['$http', function($http) {
    function getCanvas() {
      console.log('getting to get canvas')
      return $http({ method: 'GET', url: '/api/toolkit/' }).then(canvas => {
        console.log(canvas);
        return canvas.data;
      });
    }

    return {
      getCanvas: getCanvas
    };
  }
]);