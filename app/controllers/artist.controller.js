const db = require("../models");
const Artist = db.artists;
const Op = db.Sequelize.Op;
// Create and Save a new Artist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.artistName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Artist
  const artist = {
    artistName: req.body.artistName,
    dateOfBirth: req.body.dateOfBirth
  };
  // Save Artist in the database
  Artist.create(artist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Artist."
      });
    });
};
// Retrieve all Artists from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Artist.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Artists."
      });
    });
};
// Find a single Artist with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Artist.findOne({ where: { id: id }})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Artist with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Artist with id=" + id
      });
    });
};
// Update a Artist by the id in the request
exports.update = (req, res) => {
  if(!req.body.artistName){
    res.status(400).send({
      message: 'Artist name can not be empty!!'
    });
    return;
  }
  const id = req.params.id;
  Artist.update(req.body, {
    where: { id: id }    
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Artist name was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Artist with id=${id}. Maybe Artist was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Artist with id=" + id
      });
    });
};
// Delete a Artist with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Artist.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Artist was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Artist with id=${id}. Maybe Artist was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Artist with id=" + id
      });
    });
};
// Delete all Artists from the database.
exports.deleteAll = (req, res) => {
  Artist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Artists were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Artists."
      });
    });
};
// Find all published Artist
exports.findAllPublished = (req, res) => {
  Artist.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Artists."
      });
    });
};

// getArtistAlbums function temporarily commented out

// exports.getArtistAlbums =  async (req, res) => {
//   const id = req.params.artistId
//  // this.findOne(req, res)

//   const data = await Artist.findOne({
//       include: [{
//           model: Album,
//           as: 'albums'
//       }],
//       where: { id: id }
//   });

//   res.status(200).send(data)
// }