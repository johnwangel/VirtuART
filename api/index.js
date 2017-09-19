/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const home = require('./home');
const toolkit = require('./toolkit');
const drawings = require('./drawings');
const history = require('./history');
const login = require('./login')
const register = require('./register')
const logout = require('./logout')

router.use('/home', home);
router.use('/toolkit', toolkit);
router.use('/drawings', drawings);
router.use('/history', history);
router.use('/login', login);
router.use('/register', register);
router.use('/logout', logout);

module.exports = router;