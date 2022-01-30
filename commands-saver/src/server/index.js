'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const database = require('./db');
const routes = require('./routes');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static('dist'));

(async () => {
  try {
    console.log('Database initialisation...');
    const db = await database.init({ useDemodata: true });
    console.log('Database initialisation is finished');
    console.log('Routes initialisation...');
    routes.init(app, db);
    console.log('Routes initialisation is finished');
    app.listen(process.env.PORT, (err) => {
      console.log(`Server is up on port=${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Error happenned during database or route initialisations');
  }
})();

