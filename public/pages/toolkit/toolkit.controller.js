var myApp = angular.module("myApp");

myApp.controller("ToolkitController", [
  "$scope",
  "$rootScope",
  "$location",
  "$window",
  "ToolkitService",
  "UsersService",
  "$timeout",
  function($scope, $rootScope, $location, $window, ToolkitService, UsersService, $timeout) {
    $rootScope.imageForDB = '';
    $rootScope.imageDrawn = false;

    $scope.image = '';

    $scope.drawingStateArr = [];

    $scope.redrawImg = '';

    $scope.lastBrush = 'small';
    $scope.lastColor = 'black'

    $scope.modalShow = false;

    $scope.loginModalShow = false;

    $scope.progressActive = false;

    $scope.brushes = {
      small: true,
      medium: false,
      large: false,
      eraser: false
    };

    $scope.colors = {
      red: false,
      orange: false,
      yellow: false,
      green: false,
      saddlebrown: false,
      black: true,
      purple: false,
      violet: false,
      deeppink: false,
      aqua: false,
      lightseagreen: false,
      white: false
    };

    $scope.currentColor = 'black';
    $scope.currentId = '';
    $scope.currentStrokeWidth = '4';
    $scope.transparency = 1;


    ToolkitService.getCanvas().then(thisCanvas => {
      $scope.image = thisCanvas;
      window.disableCamera();
    });

    $scope.cancel = function(){
      let thisID = localStorage.getItem('currentID');
      ToolkitService.cancelCanvas(thisID)
      .then( result => {
        $window.location.href = '/';
      })
    }

    $scope.getPNG = function() {

      var canvas = document.getElementById("canvas");

      $rootScope.imageForDB = canvas.toDataURL('image/png', 1.0);
      $rootScope.imageDrawn = true;

      $scope.modalShow = true;
      $scope.progressActive = true;

      $timeout(function(){
        $scope.modalShow = false;
        if (!UsersService.userInfo.username) {
          $scope.loginModalShow = true;
        } else {
          ToolkitService.postImage($rootScope.imageForDB).then(result => {
            localStorage.setItem('currentID', '');
            $rootScope.imageForDB = '';
            $location.path('/');
            $scope.loginModalShow = false;
          });
        }
      }, 1800);

    };

    $scope.noToReg = function() {
      ToolkitService.postImage($rootScope.imageForDB).then(result => {
        localStorage.setItem('currentID', '');
        $rootScope.imageForDB = '';
        $rootScope.imageDrawn = false;
      });
      $window.location.href = '/';
      $scope.loginModalShow = false;
    }

    $scope.yesToReg = function() {
      $location.path('/login');
    }

    $scope.setColor = function (target, color) {
      for (var x in $scope.colors){
        $scope.colors[x] = false;
      }

      $scope.colors[target] = true;
      let newColor = ToolkitService.setColor(color);
      $scope.currentColor = newColor;

      if ($scope.brushes.eraser === true){
        $scope.setStrokeWidth($scope.lastBrush);
      }

      $scope[$scope.lastBrush] = true;
    }


    $scope.setStrokeWidth = function (target) {
      let newStrokeWidth = ToolkitService.setStrokeWidth(target);
      $scope.currentStrokeWidth = newStrokeWidth;

      for (var x in $scope.brushes){
        $scope.brushes[x] = false;
      }

      $scope.brushes[target] = true;

      if(target !== 'eraser') {
        $scope.lastBrush = target;
      }

    }

    $scope.setTransparency = function (transparency) {
      let newTransparency = ToolkitService.setTransparency(transparency);
      $scope.transparency = newTransparency;
    }

    $scope.clearCanvas = function(){
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    $scope.setCurrentId = function(id) {
      $scope.currentId = id;
    }

    $scope.undo = function(){
      console.log('undo method firing');

      if ($scope.drawingStateArr.length > 1){
        $scope.drawingStateArr.pop();

        let previousState = $scope.drawingStateArr[$scope.drawingStateArr.length - 1];

        let canvas = document.getElementById("canvas");

        let ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.putImageData(previousState, 0, 0);

      }
    }

    return ToolkitService.getCanvas().then(thisCanvas => {
      $scope.image = thisCanvas;
      window.disableCamera();
    });

  }
]);