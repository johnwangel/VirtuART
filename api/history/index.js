/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const { artData }  = require('../../collections/');

router.get('/', getArchivedScenes);

function getArchivedScenes(req, res) {
  artData().findOne({ "scenes.status": "archived" })
  .then(results => {
    let scenes = results.scenes;
    let archived = scenes.filter( scene => scene.status === "archived" );
    console.log("HISTORY FROM ARCHIVED", archived)
    res.json(archived);
  })
}

module.exports = router;