module.exports = app => {
  const artists = require("../controllers/artist.controller.js");
  var router = require("express").Router();
  // Create a new Artist
  router.post("/", artists.create);
  // Retrieve all Artists
  router.get("/", artists.findAll);
  // Retrieve all published Artists
  router.get("/published", artists.findAllPublished);
  // Retrieve a single Artist with id
  router.get("/:id", artists.findOne);
  // Update a Artist with id
  router.put("/:id", artists.update);
  // Delete a Artist with id
  router.delete("/:id", artists.delete);
  // Delete all Artists
  router.delete("/", artists.deleteAll);

// // get artist albums
// router.get('/:artistId/albums', artists.getArtistAlbums);

  app.use('/api/artists', router);
};