/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const saltRounds = 10;
const bcrypt = require('bcrypt');
const { userdb }  = require('../../collections/');

router.post('/', registerUser);

function registerUser(req, res) {
  const { username, password } = req.body;
  userdb().findOne({username: username})
  .then(result => {
    if (!result) {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          userdb()
            .insert({
              username: username,
              password: hash
            })
            .then(createdUser => {
              let { username, _id } = createdUser.ops[0];
              let user = { username, _id }
              res.json(user);
            })
            .catch(error => {
              console.log("Error: ", error);
            });
        });
      });
    } else {
      res.json({ userExists: true });
    }
  });
}

module.exports = router;