window.atra = function() {
  let vids = document.getElementsByTagName('video')
  if (vids.length > 0){
    document.body.removeChild(vids[0])
  }

// var saveButton= document.getElementById("save");
// saveButton.addEventListener('click', function(e){
//   return 'hi';
// });
// };

  // var sketcher = window.atrament('#sketcher');
  // var canvas = document.getElementById('sketcher');
  // var atrament = window.atrament(canvas, 640, 480 );

  // var clearButton = document.getElementById('clear');
  // canvas.addEventListener('dirty', function(e) {
  //   clearButton.style.display = window.atrament.dirty ? 'inline-block' : 'none';
  // });
};

