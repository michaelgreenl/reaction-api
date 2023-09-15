'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const basename = path.basename(__filename);
const db = {};
const loadedModels = {};
// const process = require('process');
// const env = process.env.NODE_ENV || 'development';

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    // eslint-disable-next-line
    const loadedModel = require(path.join(__dirname, file));
    const { model } = loadedModel;

    if (model) {
      db[model.name] = model;
      loadedModels[model.name] = loadedModel;
    }
  });

// Apply associations to each model
Object.keys(db).forEach((modelName) => {
  const loadedModel = loadedModels[modelName];
  if (typeof loadedModel.applyAssociations === 'function') {
    loadedModel.applyAssociations(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
