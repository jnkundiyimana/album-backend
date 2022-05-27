const db = require("../models");
const album = require("../models/album");
const Album = db.albums;
const Artist = db.artists;
const Op = db.Sequelize.Op;
// Create and Save a new Album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Album can not be empty!"
    });
    return;
  }
  // Create a Album
  const album = {
    title: req.body.title,
    artistId: req.body.artistId,
    numberOfTracks: req.body.numberOfTracks
  };
  // Save Album in the database
  Album.create(album)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Album."
      });
    });
};
// Retrieve all Albums from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Album.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Albums."
      });
    });
};

exports.findOne = async (req, res) => {
  await getSingleAlbum(req.params.id).then((data) => {
      res.status(200).send(data);
      return album;
    })
    .catch((err) => {
      console.log(">> Error while finding album: ", err);
    });
};


function getSingleAlbum(id) {
  return  Album.findByPk(id, { include: ["artist"] })
}

//update album name
exports.editAlbumTitle = async (req, res) => {
  if(!req.body.title){
    res.status(400).send({
      message: 'Album Title can not be empty!!'
    })
    return;
  }

  const id = req.params.albumId;
  await getSingleAlbum(id).then(data =>{
      Album.update(req.body, {where: {id: id }}).then(num => {
        if(num == 1){
          res.send({
            message: 'Album Title updated successfully.'
          });
        }else{
          res.send({
            message: `Cannot update Album with id=${req.params.albumId}`
          })
        }
      }).catch(err =>{
        res.status(500).send({
          message: err.message + 'with id: ' + req.params.albumId
        })
      })
    })
  }

