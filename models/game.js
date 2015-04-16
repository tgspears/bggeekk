"use strict";
module.exports = function(sequelize, DataTypes) {
  var game = sequelize.define("game", {
    bggid: DataTypes.INTEGER,
    gameName: DataTypes.TEXT,
    thumbUrl: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.game.hasMany(models.comment);
        models.game.hasMany(models.listgame);
      }
    }
  });
  return game;
};