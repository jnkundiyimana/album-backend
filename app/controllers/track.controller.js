const db = require("../models");
const album = require("../models/album");
const Track = db.tracks;
const Album = db.albums;
const Op = db.Sequelize.Op;

// Create and Save a new Track
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.trackName) {
    res.status(400).send({
      message: "trackName can not be empty!"
    });
    return;
  }
  // Create a Track
  const track = {
    trackName: req.body.trackName,
    albumId: req.params.albumId,
    trackNumber: req.body.trackNumber,
  };
  console.log("track:: ", track)
  // Save Track in the database
  Track.create(track)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Track."
      });
    });
    getNumberOfTracks(req, "create");
};
// Retrieve all Tracks from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Track.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tracks."
      });
    });
};

// Find a single Track with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const albumId = req.params.albumId;

  Track.findOne({ 
    where: { 
      albumId: { [Op.like]: `%${albumId}%` },
      id: {[Op.like]: `%${id}%`}
  },
  include: [{
    model: Album,
    as: 'album',
    include: ["artist"]
  }]  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Track with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Track with id=" + id
      });
    });
};

// Find a single Track with an id
exports.findByName = (req, res) => {
  const trackName = req.query.trackName;
  Track.findOne({ where: { trackName: trackName },
    include: [{
      model: Album,
      as: 'album',
      include: ["artist"]
    }] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Track with trackName=${trackName}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Track with id=" + trackName
      });
    });
};

//update Track
exports.update = async (req, res) => {
  if(!req.body.trackName){
    res.status(400).send({
      message: 'trackName can not be empty!!'
    })
    return;
  }

  const id = req.params.id;
  const albumId = req.params.albumId;
  Track.update(req.body, {where: { 
    albumId: { [Op.like]: `%${albumId}%` },
    id: {[Op.like]: `%${id}%`}
    }}).then(num => {
        if(num == 1){
          res.send({
            message: 'Track updated successfully.'
          });
        }else{
          res.send({
            message: `Cannot update Track with id=${req.params.trackId}`
          })
        }
      }).catch(err =>{
        res.status(500).send({
          message: err.message + 'with id: ' + req.params.trackId
        })
      })
  }

// Delete a Track from specific album
exports.delete = async (req, res) => {
  const id = req.params.id;
  const albumId = req.params.albumId;
  Track.destroy({
    where: { 
      albumId: { [Op.like]: `%${albumId}%` },
      id: {[Op.like]: `%${id}%`}
      }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Track was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Track with id=${id}, for Album with albumId=${albumId}. Maybe Track was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Track with id=" + id
      });
    });
    getNumberOfTracks(req, "");
}

function updateNumberOfTracks(album) {
  return Album.update(album, {where: {id: album.id }});
}

function getNumberOfTracks(req, meth) {
  const numberOfTracks = Track.count({
        where: { albumId: req.params.albumId },
      });
      
      numberOfTracks.then(function(result) {
        let album; 
        if (meth === "create") {
          album = {
            id: req.params.albumId,
            numberOfTracks: result+1,
          };
        } else {
          album = {
            id: req.params.albumId,
            numberOfTracks: result-1,
          };
        }
         updateNumberOfTracks(album);
      }) 
    }