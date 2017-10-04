/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const AVAILABLE_ICON = '/img/add.png';
const INPROGRESS_ICON = '/img/inprogress.png';
const { artData }  = require('../../collections/');

//load requested canvas
router.post('/', loadCanvas);
router.post('/cancel', cancel);

function cancel(req, res){
  let thisID = req.body.id;
  let parsedID = parseID(thisID);
  artData().findOne({ "scenes.tiles.id": thisID })
  .then( result => {
    let sceneID = result._id;
    result.scenes[parsedID.sceneIndex].tiles[parsedID.tileIndex].clean = 'true';
    result.scenes[parsedID.sceneIndex].tiles[parsedID.tileIndex].working = 'false';
    result.scenes[parsedID.sceneIndex].tiles[parsedID.tileIndex].url = AVAILABLE_ICON;
    artData().updateOne({"_id": sceneID}, result )
    .then( finished => {
      res.send(finished);
    })
  })
}

function loadCanvas(req, res) {
  let testID = req.body.id;
  artData().findOne({ "scenes.tiles.id": testID })
  .then( allData => {
    let currentID = getIDs(allData);
    let sceneID = allData._id;
    let tiles = allData.scenes[currentID].tiles;
    let thisIndex = 0;
    let thisObj = [];
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].id === testID){
        thisIndex = i;
        thisObj = tiles[i];
      }
    }
    if (thisObj.clean === "true"){
      allData.scenes[currentID].tiles[thisIndex].clean = "false";
      allData.scenes[currentID].tiles[thisIndex].working = "true";
      allData.scenes[currentID].tiles[thisIndex].url = INPROGRESS_ICON;
      artData().updateOne({"_id": sceneID}, allData )
      .then( response => {
          artData().findOne({ "scenes.tiles.id": testID })
          .then(results => {
            let currentScene = results.scenes.filter( scene => scene.status === "current" )[0];
            let intermediateScene = results.scenes.filter( scene => scene.status === "intermediate" )[0] || undefined;

              if ( sceneIsFull(currentScene) &&  !intermediateScene ){
              // if ( sceneIsFull(currentScene) ){
                  console.log("THIS SHOULD ONLY FIRE WHEN THE LAST ITEM ON A CANVAS IS SELECTED")
                  //results.scenes[currentID].status = "archived";
                  let newScene = generateNewScene(currentScene.id);
                  results.scenes.push(newScene)
                  artData().updateOne({"_id": sceneID}, results )
                  .then( response => console.log("NEW SCENE SAVED!!"))
              }
          })
        res.send(testID)
      })
    } else {
      res.send('false');
    }
  })
}

function parseID(thisID){
  let newIDs = thisID.split('_');
  let sceneID = Number(newIDs[0].split('').splice(5).join(''));
  let sceneIndex = --sceneID;
  let tileID = Number(newIDs[1].split('').splice(4).join(''));
  let tileIndex = --tileID;
  console.log(sceneIndex, tileIndex);
  return { sceneIndex, tileIndex }
}

function getIDs(result){
  //This function provides the index of the scene with status 'intermediate', or the index
  //of the scene with status 'current' if the previous does not exist
  let currentID = undefined;
  let intermediateID = undefined;

  for (var i = 0; i < result.scenes.length; i++) {
    if (result.scenes[i].status === "current") currentID = i;
    if (result.scenes[i].status === "intermediate") intermediateID = i;
  }
  if (intermediateID){
    return intermediateID;
  } else {
    return currentID;
  }
}

function sceneIsFull(currentScene){
  if (currentScene.tiles.every( tile => tile.clean === "false" )) return true;
  return false;
}

function generateNewScene(id){
  let oldID = Number(id.split('').splice(5).join(''));
  let newID = ++oldID;
  let currentTime = Date();
  let rows = 3;
  let columns = 3;

  return {
      "id" : "scene" + newID,
      "owner" : "admin",
      "createdAt" : currentTime,
      "rows" : rows,
      "columns" : columns,
      "status" : "intermediate",
      "marker" : "default",
      "tiles" : createTiles(String(newID), rows, columns)
    }
}

function createTiles(id, rows, columns){
  let tileObj = [];
  let count = 1;
  let currentTime = Date();

  for (var i = 1; i <= rows; i++) {
    for (var j = 1; j <= columns; j++) {
      tileObj.push({
          "id" : `scene${id}_tile${count}`,
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : i,
          "posY" : j,
          "url" : AVAILABLE_ICON,
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
      });
      count++;
    }
  }
  return tileObj;
}

module.exports = router;