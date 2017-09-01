/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const { artData }  = require('../../collections/');
const { users } = require('../../collections/');

router.get('/', getImages);
router.post('/initdb', initializeDB);

function getImages(req, res) {
  artData().findOne({ "scenes.status": "current" })
  .then(results => {
    let scenes = results.scenes;
    let currentScenes = scenes.filter( scene => scene.status === "current" || scene.status === "intermediate" );
    res.json(currentScenes);
  })
}

function initializeDB(req, res){
  console.log('Init DB', req.body.scenes[0].tiles);
  artData().insert(req.body)
  res.end('ok');
}

module.exports = router;