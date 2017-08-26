/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
// let db = require('../../models');
// let Users = db.users;
// let Messages = db.messages;
// let Topics = db.topics;


//load requested canvas
router.get('/', getImages);

function getImages(req, res) {
  console.log('hitting this');

  res.json({
    imageName: 'art.jpg',
    creator: 'Snoopy',
    updatedAt: "8 am"
  });
}

module.exports = router;