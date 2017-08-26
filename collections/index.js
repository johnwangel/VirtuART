const mongoConnectionString = 'mongodb://localhost:27017/VIRTUAL_ART_DB';
const {MongoClient} = require('mongodb');
let mongoDb = null;
let artData = null;

MongoClient.connect(mongoConnectionString, function(err, connectedDb) {
  // assert.equal(null, err);
  console.log(`Successfully connected to ${mongoConnectionString}`);
  mongoDb = connectedDb;

  artData = mongoDb.collection('artCollection');
  console.log('this is our art data', artData);
  console.log('art data no invoke', artData.find().toArray());

  // db.close(); // don't want this piece

  // artData.insertOne({images: ["../img/lolcat.jpg", "../img/sparky.jpg", "../img/add.png", "../img/keith.jpg", "../img/liz.jpg", "../img/../img/ian.gif", "../img/kristin.png", "../img/oksana.jpg", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/add.png", "../img/keith.jpg", "../img/liz.jpg", "../img/ian.gif", "../img/kristin.png", "../img/lolcat.jpg", "../img/sparky.jpg", "../img/add.png", "../img/keith.jpg", "../img/liz.jpg", "../img/../img/ian.gif", "../img/kristin.png","../img/lolcat.jpg", "../img/sparky.jpg", "../img/add.png", "../img/keith.jpg", "../img/liz.jpg", "../img/ian.gif", "../img/kristin.png", "../img/oksana.jpg"]});

});

module.exports = {
  artData: () => artData
};