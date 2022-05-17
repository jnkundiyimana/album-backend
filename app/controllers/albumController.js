const db = require('../models')
const  Album = db.albums;
const Artist = db.artists;
const Op = db.Sequelize.Op;

exports.create = (req, res) =>{
    if(!req.body.name){
        res.status(400).send({
            message: 'Empty object can not be created'
        });
        return;
    };

    //create artist
    const artist = {name: req.body.name};
    
    Artist.create(artist).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || 'Error! occured while creating an Artist'
        })
    });
};