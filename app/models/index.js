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

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.artists = require("./artist.js")(sequelize, Sequelize);
db.albums = require("./album.js")(sequelize, Sequelize);

 // Artist.hasMany(Album);

// let customerId = null;
// sequelize
//   .sync({force: true})
//   // .sync()
//   .then((result) => {
//     return Customer.create({name: "Chandler Bing", email: "cb@gmail.com"})
//     console.log(result);
//   })
//   .then(customer => {
//     customerId = customer.id;
//     console.log("First Customer Created: ",customer);
//     return customer.createOrder({total: 45});
//   })
//   .then(order => {
//     console.log("Order is : ",order);
//     return Order.findAll({ where: customerId});
//   })
//   .then(orders => {
//     console.log("All the Orders are : ",orders);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = db;