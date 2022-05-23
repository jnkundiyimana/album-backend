module.exports = app => {
  const tracks = require("../controllers/track.controller.js");

  var router = require("express").Router();

  // router.get("/", tracks.findAll);
   router.get("/", tracks.findByName);
  
  app.use('/api/tracks', router);
};