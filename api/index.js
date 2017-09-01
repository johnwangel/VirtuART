/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const home = require('./home');
const toolkit = require('./toolkit');
const drawings = require('./drawings');
const history = require('./history');

router.use('/home', home);
router.use('/toolkit', toolkit);
router.use('/drawings', drawings);
router.use('/history', history);

module.exports = router;