'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const createDemodata = require('../demodata');


module.exports = async (params) => {
  const env = process.env.NODE_ENV || 'development';
  const config = require('../../../../config/database.json')[env];
  const db = {};

  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(
      process.env.DATABASE_NAME,
      process.env.MYSQL_USER_NAME,
      process.env.MYSQL_PASSWORD,
      {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        logging: true
      }
    );
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, { ...config, logging: console.log });
  }

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      if (!db.models) {
        db.models = {};
      }
      db.models[model.name] = model;
    });

  Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
      db.models[modelName].associate(db.models);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  if (params.useDemodata && !await db.models.Command.count()) {
    await createDemodata(db);
  }
  return db;
}
