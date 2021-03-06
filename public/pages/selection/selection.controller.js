/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('SelectionController', [
  '$scope',
  '$window',
  '$location',
  'UsersService',
  function($scope, $window, $location, UsersService) {

    window.disableCamera();

    $scope.photoURLs;

    $scope.alertModalShow = false;

    $scope.loadCanvas = function(e){
      let thisID = e.target.id;
      localStorage.setItem('currentID', thisID);

      return UsersService.checkTile(thisID)
        .then(response => {
          if (response === 'false'){

            let alertModal = document.createElement('div');
            alertModal.className = 'notAvailableModal';
            alertModal.addEventListener('click', removeAlertModal);

            let alertPopup = document.createElement('div');
            alertPopup.className = 'notAvailablePopup';

            let alertMsg = document.createElement('p');
            alertMsg.className = 'notAvailableMessage';
            alertMsg.innerHTML = 'Oops! Someone just claimed that spot.';

            let alertBtn = document.createElement('button');
            alertBtn.className = 'notAvailableBtn';
            alertBtn.innerHTML = 'OK';
            alertBtn.addEventListener('click', removeAlertModal);

            alertModal.appendChild(alertPopup);
            alertPopup.appendChild(alertMsg);
            alertPopup.appendChild(alertBtn);

            document.body.appendChild(alertModal);

            function removeAlertModal(){
              let alertDivs = document.querySelectorAll('.notAvailableModal');
              if(alertDivs.length > 0){
                alertDivs.forEach(modal => {
                  modal.style.display = 'none';
                })
              }
            }

          } else {
            $location.path('/toolkit');
          }
      })
    }

    $scope.refresh = function() {
      $scope.alertModalShow = false;
      $location.path('/selection');
    }

    return UsersService.getTiles()
    .then(allData => {
      let currScene = allData.filter( scene => scene.status === "current" )[0];
      let interScene = allData.filter( scene => scene.status === "intermediate" )[0];
      if (interScene) {
        $scope.photoURLs = interScene.tiles;
      } else {
        $scope.photoURLs = currScene.tiles;
      }
    });
  }
]);