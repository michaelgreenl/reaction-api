const { DataTypes } = require('sequelize');
const timestampConfig = require('../src/db/timestamp.config');

const { STRING, INTEGER, FLOAT } = DataTypes;

const settingsDTO = {
    userId: {
        type: STRING,
        primaryKey: true,
    },
    circleSize: {
        type: INTEGER,
        defaultValue: 100,
    },
    spawnInterval: {
        type: FLOAT,
        defaultValue: 1.0,
    },
    shrinkTime: {
        type: FLOAT,
        defaultValue: 1.0,
    },
    ...timestampConfig.fields,
};

('use strict');
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('settings', settingsDTO);
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('settings');
    },
};
