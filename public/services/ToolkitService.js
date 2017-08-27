angular.module('myApp')
.service('ToolkitService', ['$http', function($http) {

    function getCanvas() {
      return $http.get('/api/toolkit')
      .then( canvas => {
        return canvas.data;
      })
    }

    function toImage() {
      let image = document.getElementById('sketcher').toDataURL();
      //save image to some location
      //user POST to save image location to database
      //return user to main page
      //event listener to re-render image for users???
    }

    return {
      getCanvas: getCanvas,
      toImage: toImage
    };
  }
]);