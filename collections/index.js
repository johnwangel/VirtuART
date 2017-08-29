const mongoConnectionString = 'mongodb://localhost:27017/VIRTUAL_ART_DB';
const {MongoClient} = require('mongodb');
let mongoDb = null;
let artData = null;

MongoClient.connect(mongoConnectionString, function(err, connectedDb) {
  // assert.equal(null, err);
  console.log(`Successfully connected to ${mongoConnectionString}`);
  mongoDb = connectedDb;

  artData = mongoDb.collection('artCollection');
  // db.close(); // don't want this piece

});

module.exports = {
  artData: () => artData
};