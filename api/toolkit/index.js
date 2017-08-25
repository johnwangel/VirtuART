/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
let db = require('../../models');
let Users = db.users;
let Messages = db.messages;
let Topics = db.topics;


//load requested canvas
router.get('/', loadCanvas);

function loadCanvas(req, res) {
  res.json({image: "add.png"});
}