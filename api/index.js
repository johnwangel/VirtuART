/*jshint esversion: 6 */
const express = require('express');
const home = require('./home');
const toolkit = require('./toolkit');
const router = express.Router();

router.use('/home', home);
router.use('/toolkit', toolkit);

module.exports = router;