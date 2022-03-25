'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {

    static associate(models) {
      this.hasMany(models.ToDo,{
        as:'todos',
        foreignKey:'statusId'
      });
    }
  }
  Status.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};