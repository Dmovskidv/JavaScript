'use strict';

const path = require('path');

module.exports = (app, db) => {
  app.get('/application', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../dist/index.html'));
  });
};