'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Command extends Model {
    static associate(models) {
      if (!models.Command.hasAlias('items')) {
        models.Command.hasMany(models.CommandItem, {
          as: 'items',
          foreignKey: 'commandId',
          targetKey: 'id'
        });
      }
    }
  };

  Command.init({
    id: {
      field: 'CommandSN',
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    changedOn: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
  }, {
    timestamps: false,
    indexes: [],
    sequelize,
    tableName: 'Command',
  });
  return Command;
};