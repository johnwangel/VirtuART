window.atra = function() {
  var sketcher = window.atrament('#sketcher');
  var canvas = document.getElementById('sketcher');
  var atrament = window.atrament(canvas, 640, 480 );

  var clearButton = document.getElementById('clear');
  canvas.addEventListener('dirty', function(e) {
    clearButton.style.display = window.atrament.dirty ? 'inline-block' : 'none';
  });





// var saveButton= document.getElementById("save");
// saveButton.addEventListener('click', function(e){
//   return 'hi';
// });
};