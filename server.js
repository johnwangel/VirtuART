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
const { userdb }  = require('./collections/');

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

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  return (users
      .findById(id)
      .then(user => done(null, user))
      .catch(err => done(err)) );
});

passport.use(
  new LocalStrategy((username, password, done) => {
    userdb().findOne( { username: username } )
    .then( user => {
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
      }
    })
    .catch(err => {
      console.log("error: ", err);
    });
  })
);

app.post('/api/login/', function (req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      console.log("GETTING TO ERROR IN LOGIN")
      return res.status(500).json({ err });
    }
    if (!user) {
      console.log("USER NOT FOUND IN LOGIN")
      return res.status(401).json({ success: false });
    }
    let { _id, username } = user;
    let loggedInUser = { _id, username };
    return res.json(loggedInUser);
  })(req, res, next);
});

app.use('/api', api);

app.get('*', function(req, res){
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});