"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    hasedPassword: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,200],
          msg: 'Minimum password length is 8'
        }
      }
      },
    }, {
      hooks: {
        beforeCreate: function(user, options, sendback){
          bcrypt.hash(user.password,10,function(err,hash){
            if(err) throw err;

            user.hashedPassword = hash;
            sendback(null,user);
          });
        }
      },
      classMethods: {
        associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};