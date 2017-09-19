const mongoConnectionString = 'mongodb://localhost:27017/VIRTUAL_ART_DB';
const {MongoClient} = require('mongodb');
let mongoDb = null;
let artData = null;
let users = null;

MongoClient.connect(mongoConnectionString, function(err, connectedDb) {
  console.log(`Successfully connected to ${mongoConnectionString}`);
  mongoDb = connectedDb;
  artData = mongoDb.collection('artCollection');
  users= mongoDb.collection('users');
});

module.exports = {
  artData: () => artData,
  users: () => users

};