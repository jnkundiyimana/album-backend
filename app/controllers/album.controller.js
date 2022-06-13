const db = require("../models");
const album = require("../models/album");
const Album = db.albums;
const Track = db.tracks;
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
    numberOfTracks: 0
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

//update album
exports.update = async (req, res) => {
  if(!req.params.albumId){
    res.status(400).send({
      message: 'albumId can not be empty!!'

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


// Delete a Album with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;
  Album.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Album was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Album with id=${id}. Maybe Album was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Album with id=" + id
      });
    });
};

exports.getAlbumTracks =  async (req, res) => {
  const id = req.params.albumId  
  const data = await Album.findOne({
      include: [{
          model: Track,
          as: 'tracks'
      }],
      where: { id: id }
  });
  res.status(200).send(data)
}

// exports.findByTitle = (req, res) => {
//   const title = req.params.title;
//   Album.findOne({ where: { title: { [Op.like]: `%${title}%` } } })
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Album with title=${title}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Album with title=" + title
//       });
//     });
// }