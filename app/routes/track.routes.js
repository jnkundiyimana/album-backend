module.exports = app => {
  const tracks = require("../controllers/track.controller.js");

  var router = require("express").Router();

  // router.get("/:albumId/tracks/", tracllks.findAll);
  
  app.use('/api/tracks', router);
};