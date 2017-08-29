/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

//load requested canvas
router.get('/', loadCanvas);

function loadCanvas(req, res) {
  res.json({image: "add.png"});
}

module.exports = router;