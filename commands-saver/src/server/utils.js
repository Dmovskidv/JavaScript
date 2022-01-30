'use strict';

const paramExistence = (param, key) => {
  if (!param) {
    throw new Error(`Incorrect request, param ${key} should be defined.` );
  }
};

const toArray = (value) => value && (Array.isArray(value) ? value : [value]) || null;

const toJSON = (value) => value && (Array.isArray(value) ? value.map(v => v.toJSON()) : value.toJSON()) || null;

const getWhere = (model, query) => {
  const where = {};
  const modelAttributes = Object.keys(model.rawAttributes);
  Object.keys(query).forEach(key => {
    if (modelAttributes.includes(key)) {
      where[key] = query[key];
    }
  });
  return where;
};

module.exports = { paramExistence, toArray, toJSON, getWhere };