angular.module('myApp')
.service('ToolkitService', ['$http', function($http) {

  let currentColor = "black";
  let currentStrokeWidth = '10px';

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

    function setColor(color){
      console.log('running function setColor on toolkit service');
      let currentColor = color;
      return currentColor;
    }

    function setStrokeWidth(width){
      console.log('running function setStrokeWidth on toolkit service');
      let currentStrokeWidth = width;
      console.log('current stroke width', currentStrokeWidth);
      return currentStrokeWidth;
    }

    return {
      getCanvas: getCanvas,
      toImage: toImage,
      setColor: setColor,
      setStrokeWidth: setStrokeWidth
    };
  }
]);