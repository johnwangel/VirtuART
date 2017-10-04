angular.module('myApp')
.service('ToolkitService', ['$http', 'UsersService', function($http, UsersService) {

  let currentColor = "black";
  let currentStrokeWidth = '10px';

    function getCanvas() {
      let thisID = localStorage.getItem('currentID');
      return $http.get("/api/toolkit").then(canvas => {
        return canvas.data;
      });
    }

    function cancelCanvas(thisID){
      return $http({
        method: 'POST',
        url: '/api/toolkit/cancel',
        data: { id: thisID }
      })
      .then( cancelInfo => {
        return cancelInfo;
      })
    }

    function postImage(base64) {
      let thisID = localStorage.getItem("currentID");
      let thisUser = UsersService.userInfo.username;
      const config = {
        method: "POST",
        url: "/api/drawings",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          image: base64,
          thisID: thisID,
          thisUser: thisUser
        })
      };
      return $http(config).then(response => {
        return response;
      });
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
      setStrokeWidth: setStrokeWidth,
      cancelCanvas: cancelCanvas
    };
  }
]);
