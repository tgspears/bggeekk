"use strict";
module.exports = function(sequelize, DataTypes) {
  var listgame = sequelize.define("listgame", {
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    tryIt: DataTypes.BOOLEAN,
    love: DataTypes.BOOLEAN,
    own: DataTypes.BOOLEAN,
    suggested: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.listgame.belongsTo(models.user);
        models.listgame.belongsTo(models.game);
      }
    }
  });
  return listgame;
};