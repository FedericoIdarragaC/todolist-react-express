'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.hasMany(models.ToDo,{
        as:'todos',
        foreignKey:'userId'
      });
    }

    static findOneByUsername(username) {
      return User.findOne({
        where:{username:username}
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user,options)=>{
    return bcrypt.hash(user.password,saltRounds)
    .then(hash => user.password = hash);
  });

  User.prototype.comparePassword = function(textPassword){
    return bcrypt.compare(textPassword,this.password)
  }
  
  return User;
};