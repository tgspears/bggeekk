"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
    	'listgames',
    	'gameName',
    	DataTypes.STRING
    )
    migration.addColumn(
    	'listgames',
    	'thumbUrl',
    	DataTypes.STRING
    )
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done();
  }
};
