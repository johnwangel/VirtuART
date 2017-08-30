const mongoConnectionString = 'mongodb://localhost:27017/VIRTUAL_ART_DB';
const {MongoClient} = require('mongodb');
let mongoDb = null;
let artData = null;
let users = null;

MongoClient.connect(mongoConnectionString, function(err, connectedDb) {
  // assert.equal(null, err);
  // console.log(`Successfully connected to ${mongoConnectionString}`);
  mongoDb = connectedDb;

  artData = mongoDb.collection('artCollection');
  users= mongoDb.collection('users');
  // console.log('this is our art data', artData);
  // console.log('art data no invoke', artData.find().toArray());

  // db.close(); // don't want this piece

  // artData.insertOne({images: ["../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/lolcat.jpg", "../img/sparky.jpg"]});

});

module.exports = {
  artData: () => artData,
  users: () => users

};