/*jshint esversion: 6 */
const PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const api = require('./api');
const { MongoClient } = require("mongodb");
const saltRounds = 10;
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// const db= require('./collections/index.js');
// const users = require("./collections/index.js").users;

app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  store: new RedisStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialize: false
}));

app.use('/api', api);

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  return (users
      .findById(id)
      //we will not have to worry about the users model as of now since we are using MONGO!
      .then(user => done(null, user))
      .catch(err => done(err)) );
});
passport.use(
  new LocalStrategy((username, password, done) => {
    users.findOne({ where: { username: username } }).then(user => {
      if (user === null) {
        return done(null, false, {
          message: "Incorrect username or password."
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then(res => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Incorrect username or password."
              });
            }
          })
          .catch(err => {
            console.log("error: ", err);
          });
      }
    });
  })
);

app.get('*', function(req, res){
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});