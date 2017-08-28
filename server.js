const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride= require('method-override');
const app = express();
//do we need this?
//const saltRounds = 10;
const PORT = process.env.PORT || 3000;
const api = require('./api');

const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);


app.use('/api', api);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

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
passport.deserializeUser(function(id, done){
  return Users.findById(id)
  //we will not have to worry about the users model as of now since we are using MONGO!
    .then(user => done(null, user))
    .catch(err => done(err));
});
passport.use(new LocalStrategy((username, password, done)=>{
  Users.findOne({where: { username: username} })
  .then(user => {
    if (user === null) {
      return done(null, false, { message: 'Incorrect username or password.'});
    }
    else {
      bcrypt.compare(password, user.password)
      .then(res => {
        if (res) { return done(null, user); }
        else {
          return done(null, false, {message: 'Incorrect username or password.'});
        }
      })
      .catch(err => { console.log('error: ', err); });
    }
  })
  }));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});