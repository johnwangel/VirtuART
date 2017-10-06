window.disableCamera = function() {
  // console.log('running disable camera');
  let vids = document.getElementsByTagName('video');
  // console.log('vids', vids);
  if (vids.length > 0){
    for (var i = 0; i < vids.length; i++) {
      vids[i].style.visibility = 'hidden';
      document.body.removeChild(vids[i]);
    }
  }
};