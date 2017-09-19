/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const saltRounds = 10;
const bcrypt = require('bcrypt');
const { users }  = require('../../collections/');

router.post('/', loginUser);

function loginUser(req, res, next) {
  console.log("post to /login is firing");
  console.log("this is our req.body", req.body);
  passport.authenticate("local", function(err, user, info) {
    console.log("going into authenticate");
    console.log("user from authenticate", user);

    if (err) {
      return res.status(500).json({ err });
    }
    if (!user) {
      return res.status(401).json({ success: false });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({ err });
      }
      console.log("successful login! from app.post");
      let { id, username } = user;
      let loggedInUser = { id, username };
      return res.json(loggedInUser);
    });
  })(req, res, next);
};

module.exports = router;