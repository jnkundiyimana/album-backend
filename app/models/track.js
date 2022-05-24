module.exports = (sequelize, Sequelize) => {
    const Track = sequelize.define("track", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      trackName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      trackNumber: {
        type: Sequelize.INTEGER
      }
    });
    return Track;
  };