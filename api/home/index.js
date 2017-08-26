/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

const artData = require('../../collections/').artData;
// console.log('this is art data', artData();

// let db = require('../../models');
// let Users = db.users;
// let Messages = db.messages;
// let Topics = db.topics;


//load requested canvas
router.get('/', getImages);

function getImages(req, res) {
  console.log('hitting this');

  // console.log('here is our art data. find()', artData().find());

  return artData().find().toArray()
  .then(results => {
    console.log('results from home index', results);
    res.json(results);
  })

  // res.json({string: 'helloooowww'});
  // .then(mongoRecords => {
  //   console.log('here is our mongo records', mongoRecords);

  //   res.json({string: 'hiiii thaarr'});
  // });

  // res.json({
  //   imageName: 'art.jpg',
  //   creator: 'Snoopy',
  //   updatedAt: "8 am"
  // });
}

module.exports = router;