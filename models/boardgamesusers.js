"use strict";
module.exports = function(sequelize, DataTypes) {
  var boardgamesusers = sequelize.define("boardgamesusers", {
    userId: DataTypes.INTEGER,
    boardgameId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return boardgamesusers;
};