window.augreal = function(photoData) {
  //////////////////////////////////////////////////////////////////////////////////
  //    Init
  //////////////////////////////////////////////////////////////////////////////////
  // init renderer

  var canvas = document.getElementById("cameraCanvas");
  var canvasContainer = document.getElementById("canvasContainer");

  let renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

    // var renderer  = new THREE.WebGLRenderer({
    //   // antialias  : true,
    //   alpha: true
    // });
    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    // renderer.setPixelRatio( 1/2 );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';

    canvasContainer.appendChild( renderer.domElement );


  // array of functions for the rendering loop
  var onRenderFcts= [];

  // init scene and camera
  var scene = new THREE.Scene();

  //////////////////////////////////////////////////////////////////////////////////
  //    Initialize a basic camera
  //////////////////////////////////////////////////////////////////////////////////

  // Create a camera
  var camera = new THREE.Camera();
  scene.add(camera);

  ////////////////////////////////////////////////////////////////////////////////
  //          handle arToolkitSource
  ////////////////////////////////////////////////////////////////////////////////

  var arToolkitSource = new THREEx.ArToolkitSource({
    sourceType : 'webcam'
  })

  arToolkitSource.init(function onReady(){
    onResize()
  })

  // handle resize
  window.addEventListener('resize', function(){
    onResize()
  })
  function onResize(){
    arToolkitSource.onResizeElement()
    arToolkitSource.copyElementSizeTo(renderer.domElement)
    if( arToolkitContext.arController !== null ){
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  //          initialize arToolkitContext
  ////////////////////////////////////////////////////////////////////////////////


  // create atToolkitContext
  var arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
    detectionMode: 'mono',
    maxDetectionRate: 30,
    canvasWidth: 80*3,
    canvasHeight: 60*3,
  })
  // initialize it
  arToolkitContext.init(function onCompleted(){
    // copy projection matrix to camera
    camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
  })

  // update artoolkit on every frame
  onRenderFcts.push(function(){
    if( arToolkitSource.ready === false ) return

    arToolkitContext.update( arToolkitSource.domElement )
  })


  ////////////////////////////////////////////////////////////////////////////////
  //          Create a ArMarkerControls
  ////////////////////////////////////////////////////////////////////////////////

  var markerRoot = new THREE.Group
  scene.add(markerRoot)
  var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
    type : 'pattern',
    patternUrl : '../public/img/invisiart'
    // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji'
  });

  // build a smoothedControls
  var smoothedRoot = new THREE.Group()
  scene.add(smoothedRoot)
  var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
    lerpPosition: 0.4,
    lerpQuaternion: 0.3,
    lerpScale: 1,
  })
  onRenderFcts.push(function(delta){
    smoothedControls.update(markerRoot)
  })
  //////////////////////////////////////////////////////////////////////////////////
  //    add an object in the scene
  //////////////////////////////////////////////////////////////////////////////////

  var arWorldRoot = smoothedRoot

  // add a torus knot
  // var geometry = new THREE.BoxGeometry(3,0.1,3);
  // var material = new THREE.MeshNormalMaterial({
  //  transparent : true,
  //  opacity: 0.5,
  //  side: THREE.DoubleSide
  // });


  // a box is created an a geo object to which the box is attached
  var squareWidth = 1;
  var squareHeight = 1;

  var gridSquaresX = 4;
  var gridSquaresY = 1;

  // var imageArray = ["../img/lolcat.jpg", "../img/sparky.jpg", "../img/add.png", "../img/keith.jpg", "../img/liz.jpg", "../img/../img/ian.gif", "../img/kristin.png", "../img/oksana.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/add.png", "../img/keith.jpg", "../img/liz.jpg", "../img/ian.gif", "../img/kristin.png", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/add.png", "../img/keith.jpg", "../img/liz.jpg", "../img/../img/ian.gif", "../img/kristin.png","../img/lolcat.jpg", "../img/sparky.jpg", "../img/add.png", "../img/keith.jpg", "../img/liz.jpg", "../img/ian.gif", "../img/kristin.png", "../img/oksana.jpg"];


  var imageArray = photoData;

renderGrid(1, 4, 4);

function renderGrid(squareWidth, rows, columns){
  var gridWidth = squareWidth * columns;
  var gridHeight = squareWidth * rows;
  var imageIndex = 0;

  var ourGrid = new THREE.Group;

  for (var row = 0; row < rows; row++){
    for (var col = 0; col < columns; col++){
      renderSquare(ourGrid, squareWidth, imageArray[imageIndex], row, col);
      imageIndex++;
    }
  }

  ourGrid.position.x = squareWidth/2 - gridWidth/2;
  ourGrid.position.z = squareWidth/2 - gridHeight/2;
  arWorldRoot.add(ourGrid);
}

function renderSquare(parent, squareWidth, image, positionZ, positionX){
  var loader = new THREE.TextureLoader();
  loader.crossOrigin = 'anonymous';
  loader.load( image, function ( texture ) {
      var geometry = new THREE.BoxGeometry(squareWidth, 0, squareWidth);
      var material = new THREE.MeshBasicMaterial( { map: texture } );
      var mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = positionX * squareWidth;
      mesh.position.z = positionZ * squareWidth;
      parent.add( mesh );
  });
}


  // var textToader = new THREE.FontLoader();
  // textToader.load( '/font.json', fontLoadComplete,  fontLoadProgress, fontLoadError);

  // function fontLoadError(error){
  //   console.log('error', error);
  // }

  // function fontLoadComplete( font ){
  //   var textGeometry = new THREE.TextGeometry( 'Oksana', {
  //     font: font,
  //     size: 12,
  //     height: 5,
  //     curveSegments: 12,
  //     bevelEnabled: true,
  //     bevelThickness: 10,
  //     bevelSize: 8,
  //     bevelSegments: 5
  //    } );
  //   console.log('text geometry', textGeometry);
  //   // textGeometry.position.x = 0.2;
  //   // textGeometry.position.y = 0.2;
  //   // textGeometry.position.x = 0.2;
  //   arWorldRoot.add(textGeometry);
  // }

  // function fontLoadProgress(){
  //   console.log('in progress');
  // }

  // picLoader = new THREE.TextureLoader();
  // picLoader.load( "oksana.jpg", function ( texture ) {
  //   var geometry = new THREE.CylinderGeometry( .1, .1, .01, 60 );
  //   var material = new THREE.MeshBasicMaterial( {map: texture} );
  //   var cylinder = new THREE.Mesh( geometry, material );
  //   cylinder.position.z = 0;
  //   cylinder.position.y = 0.2;
  //   cylinder.position.x = 0;
  //   ourGrid.add( cylinder );
  // });





  // var mesh = new THREE.Mesh( geometry, material );
  // mesh.position.y  = geometry.parameters.height/2
  // arWorldRoot.add( mesh );

  // var geometry = new THREE.TorusKnotGeometry(0.3,0.1,64,16);
  // var material = new THREE.MeshNormalMaterial();
  // var mesh = new THREE.Mesh( geometry, material );
  // mesh.position.y  = 0.5
  // arWorldRoot.add( mesh );

  // onRenderFcts.push(function(){
  //  mesh.rotation.x += 0.1
  // })

  //////////////////////////////////////////////////////////////////////////////////
  //    render the whole thing on the page
  //////////////////////////////////////////////////////////////////////////////////
  // var stats = new Stats();
  // document.body.appendChild( stats.dom );
  // render the scene
  onRenderFcts.push(function(){
    renderer.render( scene, camera );
    // stats.update();
  })

  // run the rendering loop
  var lastTimeMsec= null
  requestAnimationFrame(function animate(nowMsec){
    // keep looping
    requestAnimationFrame( animate );
    // measure time
    lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec  = nowMsec
    // call each update function
    onRenderFcts.forEach(function(onRenderFct){
      onRenderFct(deltaMsec/1000, nowMsec/1000)
    })
  })

}


// https://threejs.org/examples/webgl_materials_texture_filters.html