/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const { artData }  = require('../../collections/');

const AWS = require('aws-sdk');
const AWS_CONFIG = require('../../config/aws.json');
const AWS_ACCESS_KEY = AWS_CONFIG.AwsAccessKeyId;
const AWS_SECRET = AWS_CONFIG.AwsSecretAccessKey;
const AWS_REGION = AWS_CONFIG.region;

const credentials={
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET,
  region: AWS_REGION
};

AWS.config.update(credentials);
const s3 = new AWS.S3();

router.post('/', saveDrawing);

function saveDrawing (req, res) {
  let image = req.body.image;
  let thisID = req.body.thisID;
  let thisUser = req.body.thisUser;
  let imageBase64String = image.split(',')[1];
  let imageBuffer = new Buffer(imageBase64String, 'base64')
  const params = {
    Key: 'drawings/'+Date.now() + '.png',
    ContentType: 'image/png',
    ContentLength: imageBuffer.length,
    ACL: 'public-read',
    Bucket: 'invisiart',
    Body: imageBuffer,
    InternalID: thisID
  };

  s3.upload(params, function(err, output){
    if (err) res.send(err);
    let url = params.Key.split('/')[1];
    let time = Date.now();
    artData().findOne({ "scenes.tiles.id": thisID })
    .then( response => {
      let updateData = getUpdateData(response, thisID);
      if (updateData.sceneStatus === "intermediate"){
        //change previous scene status to archived
        response.scenes[updateData.sceneIndex - 1].status = "archived";
        //change this scene status to current
        response.scenes[updateData.sceneIndex].status = "current";
      }
      let sceneID = response._id;
      let myTile = response.scenes[updateData.sceneIndex].tiles[updateData.tileIndex];
      myTile.id = thisID;
      myTile.user = thisUser;
      myTile.createdAt = time;
      myTile.url = `https://s3-us-west-2.amazonaws.com/invisiart/drawings/${url}`;
      myTile.clean = "false";
      myTile.working = "false";
      myTile.saved = "true";
      response.scenes[updateData.sceneIndex].tiles[updateData.tileIndex] = myTile;
      artData().updateOne({"_id": sceneID}, response )
      .then(response => {
        res.send(response);
      })
    })
  });
}

function getUpdateData(response, thisID){
  for (var i = 0; i < response.scenes.length; i++) {
    let thisScene = response.scenes[i];
    for (var j = 0; j < thisScene.tiles.length; j++) {
      let thisTile = thisScene.tiles[j];
      if (thisTile.id === thisID){
        return {
          sceneIndex: i,
          sceneStatus: thisScene.status,
          tileIndex: j
        }
      }
    }
  }
}


module.exports = router;
