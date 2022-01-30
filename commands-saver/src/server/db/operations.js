'use strict';

const { toArray } = require('../utils');

const findResources = ({ model, where, count, sort, includes, fields }) => {
  return model.findAll({
    ...where && { where },
    ...count && { limit: parseInt(count, 10) },
    ...sort && { sort },
    ...includes && { include: toArray(includes).map(association => ({ association })) },
    ...fields && { attributes: fields.own }
  });
};

const findResource = ({ model,  where, sort, includes, fields }) => {
  return model.findOne({
    ...where && { where },
    ...sort && { sort },    
    ...includes && { include: toArray(includes).map(association => ({ association })) },
    ...fields && { attributes: fields.own }
  });
};

const createResource = ({ model, data }) => {
  return Array.isArray(data) ? model.bulkCreate(data) : model.create(data);
};

const updateResource = ({ model, data, where }) => {
  return model.update(data, { where });
};

const deleteResource = ({ model, resourceIds }) => {
  return model.destroy({ where: { id: resourceIds } });
};

module.exports = {
  findResources,
  findResource,
  createResource,
  updateResource,
  deleteResource
}
