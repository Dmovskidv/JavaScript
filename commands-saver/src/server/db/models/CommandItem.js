'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CommandItem extends Model {
    static associate(models) {
      models.CommandItem.belongsTo(models.Command, {
        as: 'command'
      });
    }
  };

  CommandItem.init({
    id: {
      field: 'CommandItemSN',
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    commandId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    example: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resources: {
      type: DataTypes.JSON,
      allowNull: true
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
    tableName: 'CommandItem',
  });
  return CommandItem;
};