/*jshint esversion:6 */
// console.log('the home controller is running now');

var myApp = angular.module('myApp');

myApp.controller('MainHomeController', [
  '$scope',
  '$location',
  'UsersService',
  function($scope, $location, UsersService) {
    $scope.currentPhotos = [];
    $scope.userLoggedIn = false;

    $scope.addBtn = function() {
      $location.path('/selection');
    }

    function waitForElementToDisplay(selector, time) {
        if(document.querySelector(selector)!=null) {
            let myvideo = document.getElementsByTagName('video')[0];
            let myDiv = document.getElementById('canvas_body');
            myDiv.appendChild(myvideo);
            console.log('Moved video to div element.')
            return;
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(selector, time);
            }, time);
        }
    }

    return UsersService.getTiles()
    .then(photoData => {
      let currScene = photoData.filter( scene => scene.status === "current" )[0]
      let urlList = currScene.tiles.map( allTiles => {
        return allTiles.url;
      });
      window.augreal(urlList);
      waitForElementToDisplay('video', 5000)
    });




  }
]);