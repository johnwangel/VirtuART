/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('MainHomeController', [
  '$scope',
  '$location',
  '$timeout',
  'UsersService',
  function($scope, $location, $timeout, UsersService) {
    $scope.currentPhotos = [];
    $scope.introPopUpOpen = true;

    $scope.closeIntroPopUp = function(){
      $scope.introPopUpOpen = false;
    }

    $scope.addBtn = function() {
        $location.path('/selection');
    }

    $timeout(function(){
      document.getElementById('introPopUpModal').classList.add('introPopUpModalOpacity');
    }, 7000);

    $timeout(function(){
      $scope.introPopUpOpen = false;
    }, 8000);

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
      // waitForElementToDisplay('video', 5000)
    });
  }
]);