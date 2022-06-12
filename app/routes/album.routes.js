module.exports = app => {
  const albums = require("../controllers/album.controller.js");
  const tracks = require("../controllers/track.controller.js");
  var router = require("express").Router();

  // Album Url and Controller

router.post('/', albums.create);
router.get("/", albums.findAll);
router.delete("/:id", albums.delete);

router.post('/:albumId/tracks/', tracks.create);
router.put('/:albumId/tracks/:id', tracks.update);
// router.delete('/:albumId/tracks/:id', tracks.delete);
// router.get("/:albumId/tracks/", tracks.findAll);
router.get("/:albumId/tracks/:id", tracks.findOne);
router.get("/:albumId/tracks/", tracks.getAlbumTracks);
router.put('/:albumId', albums.update);


  app.use('/api/albums', router);
};