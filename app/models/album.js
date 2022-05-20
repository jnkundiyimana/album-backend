module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define("album", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      numberOfTracks: {
        type: Sequelize.INTEGER
      }
    });
    return Album;
  };