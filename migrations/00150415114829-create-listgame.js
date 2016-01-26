"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("listgames", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      gameId: {
        type: DataTypes.INTEGER
      },
      tryIt: {
        type: DataTypes.BOOLEAN
      },
      love: {
        type: DataTypes.BOOLEAN
      },
      own: {
        type: DataTypes.BOOLEAN
      },
      suggested: {
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("listgames").done(done);
  }
};