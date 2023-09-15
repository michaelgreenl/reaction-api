const { DataTypes } = require('sequelize');
const timestampConfig = require('../src/db/timestamp.config');

const { UUID, UUIDV4, STRING, BOOLEAN } = DataTypes;

const userDTO = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  settingsId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
  statsId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  saveGameSettingsOptOut: {
    type: BOOLEAN,
    defaultValue: '0',
  },
  closeGameSettingsOptOut: {
    type: BOOLEAN,
    defaultValue: '0',
  },
  ...timestampConfig.fields,
};


'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('user', userDTO);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user');
  },
};
