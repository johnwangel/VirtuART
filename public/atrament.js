var sketcher = atrament('#mySketcher');


  var canvas = document.getElementById('sketcher');
  var atrament = atrament(canvas, window.innerWidth, window.innerHeight);

  var clearButton = document.getElementById('clear');
  canvas.addEventListener('dirty', function(e) {
    clearButton.style.display = atrament.dirty ? 'inline-block' : 'none';
  });




var saveButton= document.getElementById('save');
saveButton.addEventListener('click', function(e){
  return 'hi';
});