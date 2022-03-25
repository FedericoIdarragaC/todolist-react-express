'use strict';
const { Op } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {

    static associate(models) {
      this.belongsTo(models.Status,{
        as:'status',
        foreignKey:'statusId'
      });
      this.belongsTo(models.User,{
        as:'user',
        foreignKey:'userId'
      })
    }

    static getTodosByUser(userId){
      return this.findAll({
        where:{userId:userId},
        include:'status'
      });
    }

    static getTodosById(id,userId){
      return this.findOne({
        where:{
          [Op.and]: [
              { id: id },
              { userId: userId }
          ]
        },
        include:'status'
      });
    }
    

    static updateToDo(id,userId,todo){
      return this.update(todo,{
        where:{
            [Op.and]: [
                { id: id },
                { userId: userId }
            ]
        }
      });
    }

    static deleteToDo(id,userId){
      return ToDo.destroy({
        where:{
            [Op.and]: [
                { id: id },
                { userId: userId }
            ]
        }
      });
    }
  }
  ToDo.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    statusId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};