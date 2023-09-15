const { DataTypes } = require('sequelize');
const timestampConfig = require('../src/db/timestamp.config');

const { UUID, UUIDV4, STRING, INTEGER, FLOAT } = DataTypes;

const gameDTO = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: STRING,
    foreignKey: true,
  },
  score: {
    type: INTEGER,
    allowNull: false,
  },
  time: {
    type: FLOAT,
    allowNull: false,
  },
  ...timestampConfig.fields,
};

'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('game', gameDTO);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('game');
  },
};
