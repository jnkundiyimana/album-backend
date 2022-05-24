module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define("album", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numberOfTracks: {
        type: Sequelize.INTEGER
      },
      artistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Key: true
      },
    });
    return Album;
  };
