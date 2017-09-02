const mongoConnectionString = 'mongodb://localhost:27017/VIRTUAL_ART_DB';
const {MongoClient} = require('mongodb');
let mongoDb = null;
let artData = null;
let users = null;

MongoClient.connect(mongoConnectionString, function(err, connectedDb) {
  // assert.equal(null, err);
  console.log(`Successfully connected to ${mongoConnectionString}`);
  mongoDb = connectedDb;

  artData = mongoDb.collection('artCollection');

  users= mongoDb.collection('users');
  // console.log('this is our art data', artData);
  // console.log('art data no invoke', artData.find().toArray());


  // db.close(); // don't want this piece

//   artData.insertOne({
//   "scenes": [
//   {
//     "id": "scene1",
//     "owner": "admin",
//     "createdAt": "Mon Aug 28 14:16:46 HST 2017",
//     "rows": 3,
//     "columns": 4,
//     "status": "archived",
//     "marker": "default",
//     "tiles": [
//         {
//           "id": "scene1_tile1",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:47 HST 2017",
//           "posX": 1,
//           "posY": 1,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//         {
//           "id": "scene1_tile2",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:47 HST 2017",
//           "posX": 1,
//           "posY": 2,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//         {
//           "id": "scene1_tile3",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:48 HST 2017",
//           "posX": 1,
//           "posY": 3,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//         {
//           "id": "scene1_tile4",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:49 HST 2017",
//           "posX": 2,
//           "posY": 1,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//         {
//           "id": "scene1_tile5",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:50 HST 2017",
//           "posX": 2,
//           "posY": 2,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//                 {
//           "id": "scene1_tile6",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:51 HST 2017",
//           "posX": 2,
//           "posY": 3,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//                 {
//           "id": "scene1_tile7",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:52 HST 2017",
//           "posX": 3,
//           "posY": 1,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//         {
//           "id": "scene1_tile8",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:53 HST 2017",
//           "posX": 3,
//           "posY": 2,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//         {
//           "id": "scene1_tile9",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:54 HST 2017",
//           "posX": 3,
//           "posY": 3,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//         {
//           "id": "scene1_tile10",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:55 HST 2017",
//           "posX": 4,
//           "posY": 1,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//         {
//           "id": "scene1_tile11",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:56 HST 2017",
//           "posX": 4,
//           "posY": 2,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         },
//         {
//           "id": "scene1_tile12",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:57 HST 2017",
//           "posX": 4,
//           "posY": 3,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/keith.png",
//           "clean": "false",
//           "working": "false",
//           "saved": "true"
//         }
//       ]
//   },
//   {
//     "id": "scene2",
//     "owner": "admin",
//     "createdAt": "Mon Aug 28 14:16:46 HST 2017",
//     "rows": 3,
//     "columns": 4,
//     "status": "current",
//     "marker": "default",
//     "tiles": [
//         {
//           "id": "scene2_tile1",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:47 HST 2017",
//           "posX": 1,
//           "posY": 1,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//         {
//           "id": "scene2_tile2",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:47 HST 2017",
//           "posX": 1,
//           "posY": 2,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//         {
//           "id": "scene2_tile3",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:48 HST 2017",
//           "posX": 1,
//           "posY": 3,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//         {
//           "id": "scene2_tile4",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:49 HST 2017",
//           "posX": 2,
//           "posY": 1,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//         {
//           "id": "scene2_tile5",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:50 HST 2017",
//           "posX": 2,
//           "posY": 2,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//                 {
//           "id": "scene2_tile6",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:51 HST 2017",
//           "posX": 2,
//           "posY": 3,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//                 {
//           "id": "scene2_tile7",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:52 HST 2017",
//           "posX": 3,
//           "posY": 1,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//         {
//           "id": "scene2_tile8",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:53 HST 2017",
//           "posX": 3,
//           "posY": 2,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//         {
//           "id": "scene2_tile9",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:54 HST 2017",
//           "posX": 3,
//           "posY": 3,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//         {
//           "id": "scene2_tile10",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:55 HST 2017",
//           "posX": 4,
//           "posY": 1,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//         {
//           "id": "scene2_tile11",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:56 HST 2017",
//           "posX": 4,
//           "posY": 2,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         },
//         {
//           "id": "scene2_tile12",
//           "user": "admin",
//           "createdAt": "Mon Aug 28 14:16:57 HST 2017",
//           "posX": 4,
//           "posY": 3,
//           "url": "https://s3-us-west-2.amazonaws.com/invisiart/drawings/add.png",
//           "clean": "true",
//           "working": "false",
//           "saved": "false"
//         }
//       ]
//   }]
// });

});

module.exports = {
  artData: () => artData,
  users: () => users

};