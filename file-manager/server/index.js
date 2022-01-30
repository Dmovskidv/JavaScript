'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

routes.init(app);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log(`Server is started on port=${PORT}`);
})