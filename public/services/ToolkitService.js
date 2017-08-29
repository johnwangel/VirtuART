angular.module('myApp')
.service('ToolkitService', ['$http', function($http) {

    function getCanvas() {
      return $http.get('/api/toolkit')
      .then( canvas => {
        return canvas.data;
      })
    }

    function postImage(base64) {
        const config = {
            method: "POST",
            url: "/api/drawings",
            headers: {
              "Content-Type": "application/json"
            },
            data: JSON.stringify({
              image: base64
            })
          };
          return $http(config);
        }

    return {
      getCanvas: getCanvas,
      postImage: postImage
    };
  }
]);