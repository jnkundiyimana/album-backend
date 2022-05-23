
const dbConfig = require('../config/dbConfig.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliasses:0,

});


//did not understand these parts
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.artists = require('./artist.js')(sequelize, Sequelize);
//db.albums = require('./album.js')(sequelize, Sequelize);
module.exports = db;
