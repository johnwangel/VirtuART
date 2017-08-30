/*jshint esversion: 6 */
const express = require('express');
const home = require('./home');
const toolkit = require('./toolkit');
const drawings = require('./drawings');
const router = express.Router();

router.use('/home', home);
router.use('/toolkit', toolkit);
router.use('/drawings', drawings);

module.exports = router;