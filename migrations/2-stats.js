const { DataTypes } = require('sequelize');
const timestampConfig = require('../src/db/timestamp.config');

const { STRING, INTEGER, FLOAT } = DataTypes;

const statsDTO = {
  userId: {
    type: STRING,
    primaryKey: true,
  },
  totalGames: {
    type: INTEGER,
    defaultValue: 0,
  },
  highScore: {
    type: INTEGER,
    defaultValue: 0,
  },
  highTime: {
    type: FLOAT,
    defaultValue: 0,
  },
  ...timestampConfig.fields,
};

('use strict');
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('stats', statsDTO);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('stats');
  },
};
