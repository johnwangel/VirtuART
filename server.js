const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride= require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

const saltRounds = 10;
const apiRoute = require('./api');
const AWS = require('aws-sdk');
const AWS_ACCESS_KEY = require('./config/aws.json').AwsAccessKeyId;
const AWS_SECRET = require('./config/aws.json').AwsSecretAccessKey;
const db= require('./collections/index.js');

const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const credentials={
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET
};

AWS.config.update(credentials);
const s3 = new AWS.S3();
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  store: new RedisStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialize: false
}));

app.use('/api', api);

app.post('/register', (req, res) => {
  console.log('running a post on register');

  let {username, password} = req.body;

  bcrypt.genSalt(saltRounds, function(err, salt) {

    bcrypt.hash(password, salt, function(err, hash) {
      return Users.create({
        username: username,
        password: hash
      })
      .then(createdUser => {
        let {username, id} = createdUser;
        let user = {username, id};
        res.json(user);
      })
      .catch((error) => {
        console.log ('here is our error', error);
      });
    });
  });
});

app.post('/login', function(req, res, next) {
  console.log('post to /login is firing');
  console.log('this is our req.body', req.body);
  passport.authenticate('local', function (err, user, info) {
    console.log('going into authenticate');
    console.log('user from authenticate', user);

    if (err) { return res.status(500).json({err}); }

    if (!user) { return res.status(401).json({success: false}); }
    req.logIn(user, function(err) {
      if (err) {return res.status(500).json({err}); }
      console.log('successful login! from app.post');
      let {id, username} = user;
      let logedInUser = {id, username};
      return res.json(logedInUser);
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({loggedout: true});
})

app.post('/api/drawings', (req, res)=>{
  let image = req.body.image;
  let imageBase64String = image.split(',')[1];
  let imageBuffer = new Buffer(imageBase64String, 'base64')

  const params = {
    key: 'drawings/'+Date.now() + '.png',
    ContentType: 'image/png',
    ACL: 'public-read',
    Bucket: 'virtuarthawaii',
    Body: imageBuffer
  };
  s3.upload(params, function(err,output){
    console.log(err);
    console.log(output);
    res.send("image received");
    console.log('website', output.Location);
  });
});

app.post('/api/drawings', (req, res)=>{
  const params = {
    Key: 'drawings/'+Date.now(),
    ContentLength: req.body.image.length,
    ContentType: 'image/png',
    ACL: 'public-read',
    Bucket: 'virtuarthawaii',
    Body: req.body.image

  };
  s3.upload(params, function(err,output){
    console.log(err);
    console.log(output);
    res.send("image received");
    console.log('website', output.Location);
  });
});

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