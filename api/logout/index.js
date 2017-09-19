/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

router.post('/', logoutUser);

function logoutUser(req, res) {
  res.json({ loggedout: true });
}

module.exports = router;