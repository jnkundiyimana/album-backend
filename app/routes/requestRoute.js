module.exports = app =>{
    const artist = require('../controllers/albumController.js');
    var router = require('express').Router();

    router.post('/', artist.create);

    app.use(`/api/artist`,router);
}