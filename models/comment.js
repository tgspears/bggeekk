"use strict";
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define("comment", {
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.user);
        models.comment.belongsTo(models.game);
      }
    }
  });
  return comment;
};