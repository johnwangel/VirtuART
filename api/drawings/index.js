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

    artData().findOne({ "scenes.tiles.id": "scene1_tile1" })
    .then( response => {
      let sceneID = response._id;
      response.scenes[0].tiles[0] = {
          "id" : "scene1_tile1",
          "user" : "new_user",
          "createdAt" : time,
          "posX" : 1,
          "posY" : 1,
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
