angular.module('myApp')
.service('ToolkitService', ['$http', function($http) {

    function getCanvas() {
      return $http.get('/api/toolkit')
      .then( canvas => {
        return canvas.data;
      })
    }

    // function toImage() {
    //   let image = document.getElementById('canvas').toDataURL('image/png', 1.0);
    //   //save image to some location
    //   //user POST to save image location to database
    //   //return user to main page
    //   //event listener to re-render image for users???
    // }

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