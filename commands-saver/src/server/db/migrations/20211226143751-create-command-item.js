'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('CommandItem', {
      CommandItemSN: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      CommandId: {
        type: DataTypes.BIGINT,
        allowNull: false,   
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Example: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Resources: {
        type: DataTypes.JSON,
        allowNull: true
      },
      CreatedOn: {
        type: DataTypes.DATE,
        allowNull: false
      },
      ChangedOn: {
        type: DataTypes.DATE,
        allowNull: false
      }     
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('CommandItem');
  }
};