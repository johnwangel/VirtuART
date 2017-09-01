/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const { artData }  = require('../../collections/');

//load requested canvas
router.post('/', loadCanvas);

function loadCanvas(req, res) {
  let testID = req.body.id;

  artData().findOne({ "scenes.tiles.id": testID })
  .then( result => {
    //determine if there are both current and intermediate scenes
    //use intermediate if exists, otherwise use current
    let currentID = getIDs(result);
    let sceneID = result._id;
    let tiles = result.scenes[currentID].tiles;
    let thisIndex = 0;
    let thisObj = [];
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].id === testID){
        thisIndex = i;
        thisObj = tiles[i];
      }
    }
    if (thisObj.clean === "true"){
      result.scenes[currentID].tiles[thisIndex].clean = "false";
      result.scenes[currentID].tiles[thisIndex].url = `https://s3-us-west-2.amazonaws.com/invisiart/drawings/inprogress.png`;
      artData().updateOne({"_id": sceneID}, result )
      .then( response => {
          artData().findOne({ "scenes.tiles.id": testID })
          .then(results => {
            let currentScene = results.scenes.filter( scene => scene.status === "current" )[0];
              if ( sceneIsFull(currentScene) ){
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

function getIDs(result){
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

  return {
      "id" : "scene" + newID,
      "owner" : "admin",
      "createdAt" : currentTime,
      "rows" : 3,
      "columns" : 4,
      "status" : "intermediate",
      "marker" : "default",
      "tiles" : [
        {
          "id" : "scene" + String(newID) + "_tile1",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 1,
          "posY" : 1,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile2",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 1,
          "posY" : 2,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile3",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 1,
          "posY" : 3,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile4",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 2,
          "posY" : 1,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile5",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 2,
          "posY" : 2,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile6",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 2,
          "posY" : 3,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile7",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 3,
          "posY" : 1,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile8",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 3,
          "posY" : 2,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile9",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 3,
          "posY" : 3,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile10",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 4,
          "posY" : 1,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile11",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 4,
          "posY" : 2,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        },
        {
          "id" : "scene" + String(newID) + "_tile12",
          "user" : "admin",
          "createdAt" : currentTime,
          "posX" : 4,
          "posY" : 3,
          "url" : "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
          "clean" : "true",
          "working" : "false",
          "saved" : "false"
        }
      ]
    }
}



module.exports = router;