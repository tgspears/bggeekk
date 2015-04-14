"use strict";
module.exports = function(sequelize, DataTypes) {
  var boardgame = sequelize.define("boardgame", {
    name: DataTypes.STRING,
    boardgameId: DataTypes.INTEGER,
    yearPublished: DataTypes.INTEGER,
    minPlayers: DataTypes.INTEGER,
    maxPlayers: DataTypes.INTEGER,
    playingTime: DataTypes.INTEGER,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    image: DataTypes.STRING,
    boardgameCategory: DataTypes.STRING,
    boardgameMechanic: DataTypes.STRING,
    boardgamePublisher: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return boardgame;
};