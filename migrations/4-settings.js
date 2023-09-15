const { DataTypes } = require('sequelize');
const timestampConfig = require('../src/db/timestamp.config');

const { STRING, INTEGER, FLOAT } = DataTypes;

const settingsDTO = {
  id: {
    type: STRING,
    primaryKey: true,
  },
  userId: {
    type: STRING,
    foreignKey: true,
  },
  shrinkTime: {
    type: FLOAT,
    defaultValue: 2.0,
  },
  difficulty: {
    type: STRING,
    defaultValue: 'medium',
  },
  circleColor: {
    type: STRING,
    defaultValue: '#FFFFFF',
  },
  circleSize: {
    type: INTEGER,
    defaultValue: 100,
  },
  ...timestampConfig.fields,
};

'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('settings', settingsDTO);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('settings');
  },
};
