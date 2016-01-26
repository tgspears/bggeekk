"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      bggid: {
        type: DataTypes.INTEGER
      },
      gameName: {
        type: DataTypes.TEXT
      },
      thumbUrl: {
        type: DataTypes.TEXT
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
    migration.dropTable("games").done(done);
  }
};