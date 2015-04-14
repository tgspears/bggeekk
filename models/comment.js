"use strict";
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define("comment", {
    commentBody: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    boardgameId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return comment;
};