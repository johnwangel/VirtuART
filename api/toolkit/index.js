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
    let sceneID = result._id;
    let tiles = result.scenes[0].tiles;
    let thisIndex = 0;
    let thisObj = [];
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].id === testID){
        thisIndex = i;
        thisObj = tiles[i];
      }
    }
    if (thisObj.clean === "true"){
      result.scenes[0].tiles[thisIndex].clean = "false";
      result.scenes[0].tiles[thisIndex].url = `https://s3-us-west-2.amazonaws.com/invisiart/drawings/inprogress.png`;
      artData().updateOne({"_id": sceneID}, result )
      .then( response => {
        res.send(testID)
      })
    } else {
      res.send('false');
    }
  })
}

module.exports = router;