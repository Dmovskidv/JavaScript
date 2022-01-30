'use strict';

const { pick } = require('lodash');
const { paramExistence,  toJSON, getWhere, toArray } = require('../utils');
const {
  findResource,
  findResources,
  createResource,
  deleteResource
} = require('../db/operations');

module.exports = (app, db) => { 
  app.get('/application/command/items', async (req, res) => {
    try {
      const model = db.models.CommandItem;
      const commandItems = await findResources({
        model,
        where: getWhere(model, req.query),
        ...req.query
      });
      res.send(toJSON(commandItems));
    } catch(err) {
      console.error(`Unable to fetch command items`, err);
      res.status(500).send(err.message);
    }   
  });

  app.get('/application/command/items/:id', async (req, res) => {
    try {
      const model = db.models.CommandItem;
      const commandItem = await findResource({
        model,
        where: { id: parseInt(req.params.id, 10) },
        ...req.query
      });
      if (!commandItem) {
        throw new Error(`Command item with id=${req.params.id} is not found`);
      }
      res.send(commandItem);
    } catch (err) {
      console.error(`Unable to fetch command item for id=${req.params.id}`, err);
      res.status(500).send(err.message);
    }  
  });

  app.post('/application/command/items', async (req, res) => {
    try {
      const data = toArray(req.body);
      data.forEach(item => {
        paramExistence(item.commandId, 'commandId');
      });  
      const model = db.models.CommandItem;
      const modelAttributes = Object.keys(model.rawAttributes);
      const createdCommandItems = await createResource({
        model,
        data: data.map(item => ({
          ...pick(item, modelAttributes),
          createdOn: new Date(),
          changedOn: new Date()
        }))
      });
      res.status(201).send(createdCommandItems);
    } catch(err) {
      console.error(`Unable to create commands`, err);
      res.status(500).send(err.message);
    }   
  });

  app.put('/application/command/items', async (req, res) => {
    try {
      const data = toArray(req.body);
      const model = db.models.CommandItem;
      const commandItemsToUpdate = await findResources({
        model,
        where: data.map(({ id }) => id)
      });
      const updatedItems = [];
      if (!commandItemsToUpdate.length) {
        throw new Error('Not found command items to update');
      }
      const modelAttributes = Object.keys(model.rawAttributes);
      for (const instance of commandItemsToUpdate) {
        const dataToUpdate = pick(data.find(({ id }) => id === instance.id), ['description', 'example', 'resources']);
        const updatedItem = await instance.update(dataToUpdate);
        updatedItems.push(toJSON(updatedItem));
      }      
      res.send(updatedItems);
    } catch(err) {
      console.error(`Unable to update command items`, err);
      res.status(500).send(err.message);
    }   
  });

  app.delete('/application/command/items', async (req, res) => {
    try {
      if (!req.body.resourceIds) {
        throw new Error('Invalid request body, need specify resource IDs');
      }
      const model = db.models.CommandItem;
      const commandsToDelete = await findResources({
        fields: { own: ['id'] },
        model,
        where: { id: req.body.resourceIds }
      });
      if (!commandsToDelete.length) {
        throw new Error('Not found command items to delete');
      }
      await deleteResource({ model, resourceIds: commandsToDelete.map(({ id }) => id) });
      res.sendStatus(200);
    } catch(err) {
      console.error(`Unable to delete command items`, err);
      res.status(500).send(err.message);
    }   
  });
};