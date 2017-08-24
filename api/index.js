/*jshint esversion: 6 */
const express = require('express');
const users = require('./users');
const messages = require('./messages');
const topics = require('./topics');

const router = express.Router();

router.use('/users', users);
router.use('/messages', messages);
router.use('/topics', topics);

module.exports = router;