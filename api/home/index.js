/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const { artData }  = require('../../collections/');

router.get('/', getImages);
router.post('/initdb', initializeDB);

function getImages(req, res) {
  artData().findOne({ "scenes.id": "scene1" })
  .then(results => {
    let urlList = results.scenes[0].tiles.map( allTiles => {
      return allTiles.url;
    });
    res.json(urlList);
  })
}

function initializeDB(req, res){
  console.log('Init DB', req.body.scenes[0].tiles);
  artData().insert(req.body)
  res.end('ok');
}

module.exports = router;