'use strict';

const { pick } = require('lodash');
const { paramExistence, toJSON, getWhere, toArray } = require('../utils');
const {
  findResource,
  findResources,
  createResource,
  deleteResource
} = require('../db/operations');


module.exports = (app, db) => { 
  app.get('/application/commands', async (req, res) => {
    try {
      const model = db.models.Command;
      const commands = await findResources({
        model,
        where: getWhere(model, req.query),
        ...req.query
      });
      res.send(toJSON(commands));
    } catch(err) {
      console.error(`Unable to fetch commands`, err);
      res.status(500).send(err.message);
    }   
  });

  app.get('/application/commands/:id', async (req, res) => {
    try {
      const model = db.models.Command;
      const command = await findResource({
        model,
        where: { id: parseInt(req.params.id, 10) },
        ...req.query
      });
      if (!command) {
        throw new Error(`Command for id=${req.params.id} is not found`)
      }
      res.send(toJSON(command));
    } catch (err) {
      console.error(`Unable to fetch command for id=${req.params.id}`, err);
      res.status(500).send(err.message);
    }  
  });

  app.post('/application/commands', async (req, res) => {
    try {
      const model = db.models.Command;
      const data = toArray(req.body); 
      const types = [];
      data.forEach(item => {
        paramExistence(item.type, 'type');
        types.push(item.type);
      });
      if (types.length) {
        const alreadyExists = !!(await findResources({
          fields: { own: ['id'] },
          model,
          where: {
            type: types
          }
        })).length;
        if (alreadyExists) {
          throw new Error(`Invalid request body, command type already exists`);
        }
      }    
      const modelAttributes = Object.keys(model.rawAttributes);
      const createdCommands = await createResource({
        model,
        data: data.map(item => ({
          ...pick(item, modelAttributes),
          createdOn: new Date(),
          changedOn: new Date()
        }))
      });
      res.status(201).send(createdCommands);
    } catch(err) {
      console.error(`Unable to create commands`, err);
      res.status(500).send(err.message);
    }   
  });

  app.put('/application/commands', async (req, res) => {
    try {
      const data = toArray(req.body);
      const model = db.models.Command;
      const commandsToUpdate = await findResources({
        model,
        where: { id: data.map(({ id }) => id) }
      });
      const updatedCommands = [];
      if (!commandsToUpdate.length) {
        throw new Error('Not found commands to update');
      }
      for (const instance of commandsToUpdate) {  
        const dataToUpdate = {
          ...pick(data.find(({ id }) => id === instance.id), ['type']),
          changedOn: new Date()
        };  
        delete dataToUpdate.id;
        const updatedCommand = await instance.update(dataToUpdate);
        updatedCommands.push(updatedCommand);
      }      
      res.send(updatedCommands);
    } catch(err) {
      console.error(`Unable to update commands`, err);
      res.status(500).send(err.message);
    }   
  });

  app.delete('/application/commands', async (req, res) => {
    try {
      if (!req.body.resourceIds) {
        throw new Error('Invalid request body, need to specify resource IDs');
      }
      const model = db.models.Command;
      const commandsToDelete = await findResources({
        fields: { own: ['id'] },
        model,
        where: { id: req.body.resourceIds }
      });
      if (!commandsToDelete.length) {
        throw new Error('Not found commands to delete');
      }
      await deleteResource({ model, resourceIds: commandsToDelete.map(({ id }) => id) });
      res.sendStatus(200);
    } catch(err) {
      console.error(`Unable to delete commands`, err);
      res.status(500).send(err.message);
    }   
  });
};