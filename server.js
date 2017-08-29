const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride= require('method-override');
const app = express();

//do we need this?
//const saltRounds = 10;
const PORT = process.env.PORT || 9000;

const api = require('./api');
const AWS = require('aws-sdk');
const AWS_ACCESS_KEY = require('./config/aws.json').AwsAccessKeyId;
const AWS_SECRET = require('./config/aws.json').AwsSecretAccessKey;
const base64 = require('base-64');

const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);


app.use('/api', api);

const db = require('./collections/index.js');


// console.log(AWS_ACCESS_KEY, AWS_SECRET)
//using s3 to authenticate
const credentials={
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET
};

AWS.config.update(credentials);
const s3 = new AWS.S3();

app.use('/api', api);
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  store: new RedisStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialize: false
}));
app.post('/api/login', (req,res)=>{

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