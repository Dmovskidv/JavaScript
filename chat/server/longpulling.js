'use strict';

const express = require('express');
const app = express();
const Emmiter = require('events');
const emmiter = new Emmiter();
const cors = require('cors');
const bodyParser = require('body-parser');
const status = require('http-status');

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());


app.get('/get-messages', (req, res) => {
  emmiter.once('message', (message) => {
    res.json(message);
  });
});

app.post('/new-messages', (req, res) => {
  try {
    const message = req.body.message;
    emmiter.emit('message', message);
    res.sendStatus(status.OK);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error('Server is not up', err);
    return;
  }
  console.log(`Server is listening port=${PORT}...`);
})