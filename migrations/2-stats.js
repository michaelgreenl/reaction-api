const { DataTypes } = require('sequelize');
const timestampConfig = require('../src/db/timestamp.config');

const { UUID, UUIDV4, STRING, INTEGER, FLOAT } = DataTypes;

const statsDTO = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: STRING,
    foreignKey: true,
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

'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('stats', statsDTO);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('stats');
  },
};
