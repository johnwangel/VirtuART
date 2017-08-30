
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
      return $http(config);
    }
    function setColor(color){
      console.log('running function setColor on toolkit service');
      let currentColor = color;
      return currentColor;
    }

    function setStrokeWidth(target){
      console.log('running function setStrokeWidth on toolkit service');

      switch(target){
        case 'small':
          currentStrokeWidth = '4';
          break;
        case 'medium':
          currentStrokeWidth = '14';
          break;
        case 'large':
          currentStrokeWidth = '30';
          break;
        case 'eraser':
          currentStrokeWidth = '30';
          break;
        default:
          currentStrokeWidth = '4';
      }

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
