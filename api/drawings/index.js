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
  let imageBase64String = image.split(',')[1];
  let imageBuffer = new Buffer(imageBase64String, 'base64')
  const params = {
    Key: 'drawings/'+Date.now() + '.png',
    ContentType: 'image/png',
    ContentLength: imageBuffer.length,
    ACL: 'public-read',
    Bucket: 'invisiart',
    Body: imageBuffer
  };
  s3.upload(params, function(err, output){
    if (err) res.send(err);
    let url = params.Key.split('/')[1];
    let time = Date.now();

    artData().findOne({ "scenes.tiles.id": thisID })
    .then( response => {
      let objIndex = 0;
      let posX = 0;
      let posY = 0;
      response.scenes[0].tiles.filter( (item, i) => {
        if (item.id = thisID){
          objIndex = i;
          posX = item.posX;
          posY = item.posY;
        }
      })

      let sceneID = response._id;
      response.scenes[0].tiles[objIndex] = {
          "id" : thisID,
          "user" : "new_user",
          "createdAt" : time,
          "posX" : posX,
          "posY" : posY,
          "url" : `https://s3-us-west-2.amazonaws.com/invisiart/drawings/${url}`,
          "clean" : "false"
        }
        artData().updateOne({"_id": sceneID}, response )
        .then(response => {
          res.send(response);
        })
    })
  });
}
module.exports = router;
