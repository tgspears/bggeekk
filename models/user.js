"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    hashPass: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate: function(user,options,sendback){
        bcrypt.hash(user.hashPass,10,function(err,hash){
          if(err) throw err;
            user.hashPass=hash;
            sendback(null,user);
        });
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.comment);
        models.user.hasMany(models.listgame);
      }
    }
  });
  return user;
};