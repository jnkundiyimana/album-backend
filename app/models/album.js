module.exports = (sequelize, Sequelize) =>{
    const Album = sequelize.define('album',{
        artist: {
            type: Sequelize.STRING
        },
        album:{
            type: Sequelize.STRING
        }
    });
    return Album;
}