'use strict';

const commandRoutes = require('./command');
const commandItemRoutes = require('./commandItem');
const rootRoutes = require('./rootRoutes');

module.exports.init = (app, db) => {
  rootRoutes(app, db);
  commandRoutes(app, db);
  commandItemRoutes(app, db);
};
