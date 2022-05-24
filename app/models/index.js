const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};

const Artist = require("./artist.js");
const Album = require("./album.js");
const Track = require("./track.js");

db.Sequelize = Sequelize
db.sequelize = sequelize
db.artists = require("./artist.js")(sequelize, Sequelize)
db.albums = require("./album.js")(sequelize, Sequelize)
db.tracks = require("./track.js")(sequelize, Sequelize)

// db.sequelize.sync({ force: false })
// .then(() => {
//     console.log('yes re-sync done!')
// })


// oneToMany Relation
db.artists.hasMany(db.albums, {
  foreignKey: 'artistId',
  as: 'albums'
})

db.albums.belongsTo(db.artists, {
  foreignKey: 'artistId',
  as: 'artist'
})

// oneToMany
db.albums.hasMany(db.tracks, {
  foreignKey: 'albumId',
  as: 'tracks'
})

db.tracks.belongsTo(db.albums, {
  foreignKey: 'albumId',
  as: 'album'
})


module.exports = db;
