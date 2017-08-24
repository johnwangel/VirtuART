// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        console.log('getting here')
        video.play();
    });
}


var c = document.getElementById("drawingCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(640,480);
ctx.stroke();
ctx.moveTo(0,480);
ctx.lineTo(640,0);
ctx.stroke();