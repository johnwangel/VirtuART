/*jshint esversion: 6 */
const express = require('express');
const home = require('./home');
// const messages = require('./messages');
// const topics = require('./topics');
const toolkit = require('./toolkit');

const router = express.Router();

// router.use('/users', users);
// router.use('/messages', messages);
// router.use('/topics', topics);

router.use('/home', home);
router.use('/toolkit', toolkit);

module.exports = router;