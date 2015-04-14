"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("boardgames", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      boardgameId: {
        type: DataTypes.INTEGER
      },
      yearPublished: {
        type: DataTypes.INTEGER
      },
      minPlayers: {
        type: DataTypes.INTEGER
      },
      maxPlayers: {
        type: DataTypes.INTEGER
      },
      playingTime: {
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      },
      thumbnail: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      boardgameCategory: {
        type: DataTypes.STRING
      },
      boardgameMechanic: {
        type: DataTypes.STRING
      },
      boardgamePublisher: {
        type: DataTypes.STRING
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
    migration.dropTable("boardgames").done(done);
  }
};