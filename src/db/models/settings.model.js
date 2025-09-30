const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const timestampConfig = require('../timestamp.config');

const { STRING, INTEGER, FLOAT } = DataTypes;

class Settings extends Model {}

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

Settings.init(settingsDTO, {
  ...timestampConfig.tableOptions,
  sequelize,
  tableName: 'settings',
});

const applyAssociations = (models) => {
  const { User } = models;

  Settings.belongsTo(User);
};

module.exports = {
  model: Settings,
  settingsDTO,
  applyAssociations,
};
