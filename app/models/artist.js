module.exports = (sequelize, Sequelize) => {
  const Artist = sequelize.define("artist", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    artistName: {
      type: Sequelize.STRING
    },
    dateOfBirth: {
      type: Sequelize.STRING
    }
  });
  return Artist;
}