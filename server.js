const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride= require('method-override');
const session= require('express-session');
const app = express();
const RedisStore = require('connect-redis')(session);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const PORT = process.env.PORT || 3000;
const api = require('./api');

app.use('/api', api);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  return Users.findById(id)
  //we will not have to worry about the users model as of now since we are using MONGO!
    .then(user => done(null, user))
    .catch(err => done(err));
});
passport.use(new LocalStrategy((username, password, done)=>{
  //we will use facebook strategy here
  }));

app.get('*', function(req, res){
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});