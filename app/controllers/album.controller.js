const db = require("../models");
const Album = db.albums;
const Artist = db.artists;
const Op = db.Sequelize.Op;
// Create and Save a new Album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Album
  const album = {
    title: req.body.title,
    artistId: req.body.artistId,
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

exports.findOne = (req, res) => {
  const id = req.params.id;
  return Album.findByPk(id, { include: ["artist"] })
    .then((album) => {
      res.status(200).send(album)
      return album;
    })
    .catch((err) => {
      console.log(">> Error while finding album: ", err);
    });
};