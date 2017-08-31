/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const { artData }  = require('../../collections/');

const artData = require('../../collections/').artData;
// console.log('this is art data', artData();
const users = require('../../collections/').users;
// let db = require('../../models');
// let Users = db.users;
// let Messages = db.messages;
// let Topics = db.topics;

console.log(users);
//load requested canvas

router.get('/', getImages);
router.post('/initdb', initializeDB);

function getImages(req, res) {
  artData().findOne({ "scenes.id": "scene1" })
  .then(results => {
    res.json(results.scenes[0]);
  })
}

function initializeDB(req, res){
  console.log('Init DB', req.body.scenes[0].tiles);
  artData().insert(req.body)
  res.end('ok');
}

module.exports = router;