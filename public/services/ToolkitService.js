angular.module('myApp')
.service('ToolkitService', ['$http', function($http) {

  let currentColor = "black";
  let currentStrokeWidth = '10px';

    function getCanvas() {
      return $http.get("/api/toolkit").then(canvas => {
        return canvas.data;
      });
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
      return $http(config).then(response => {
        console.log('getting to http config');
        return response;
      });
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
      postImage: postImage,
      setColor: setColor,
      setStrokeWidth: setStrokeWidth
    };
  }
]);
