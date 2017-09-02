window.disableCamera = function() {
  let vids = document.getElementsByTagName('video');
  if (vids.length > 0){
    for (var i = 0; i < vids.length; i++) {
       document.body.removeChild(vids[i]);
    }
  }
};