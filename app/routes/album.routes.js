module.exports = app => {
  const albums = require("../controllers/album.controller.js");
  const tracks = require("../controllers/track.controller.js");
  var router = require("express").Router();

  // Album Url and Controller

router.post('/', albums.create);
router.get("/", albums.findAll);
router.get("/:id", albums.findOne);

router.post('/:albumId/tracks/', tracks.create);
// router.get("/:albumId/tracks/", tracks.findAll);
router.get("/:albumId/tracks/:id", tracks.findOne);
router.get("/:albumId/tracks/", tracks.getAlbumTracks);
router.put('/:albumId', albums.editAlbumTitle);


  app.use('/api/albums', router);
};