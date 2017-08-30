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

//   artData.insertOne({
//   "scenes": [{
//     "id": "scene1",
//     "owner": "admin",
//     "createdAt": "Mon Aug 28 14:16:46 HST 2017",
//     "rows": 4,
//     "columns": 4,
//     "current": "true",
//     "tiles": [
//         {
//           "id": "scene1_tile1",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:47 HST 2017",
//           "posX": 1,
//           "posY": 1,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile2",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:47 HST 2017",
//           "posX": 1,
//           "posY": 2,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile3",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:48 HST 2017",
//           "posX": 1,
//           "posY": 3,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile4",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:49 HST 2017",
//           "posX": 1,
//           "posY": 4,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile5",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:50 HST 2017",
//           "posX": 2,
//           "posY": 1,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//                 {
//           "id": "scene1_tile6",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:51 HST 2017",
//           "posX": 2,
//           "posY": 2,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//                 {
//           "id": "scene1_tile7",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:52 HST 2017",
//           "posX": 2,
//           "posY": 3,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile8",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:53 HST 2017",
//           "posX": 2,
//           "posY": 4,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile9",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:54 HST 2017",
//           "posX": 3,
//           "posY": 1,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile10",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:55 HST 2017",
//           "posX": 3,
//           "posY": 2,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile11",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:56 HST 2017",
//           "posX": 3,
//           "posY": 3,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile12",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:57 HST 2017",
//           "posX": 3,
//           "posY": 4,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile13",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:58 HST 2017",
//           "posX": 4,
//           "posY": 1,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile14",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:59 HST 2017",
//           "posX": 4,
//           "posY": 2,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile15",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:50 HST 2017",
//           "posX": 4,
//           "posY": 3,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         },
//         {
//           "id": "scene1_tile16",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:50 HST 2017",
//           "posX": 4,
//           "posY": 4,
//           "url": "https://s3.amazonaws.com/virtuarthawaii/drawings/add.png",
//           "clean": "true"
//         }
//       ]
//   }]
// });

});

module.exports = {
  artData: () => artData
};