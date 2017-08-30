window.disableCamera = function() {
  let vids = document.getElementsByTagName('video');
  if (vids.length > 0){
    document.body.removeChild(vids[0]);
  }
};