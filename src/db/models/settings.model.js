const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const timestampConfig = require('../timestamp.config');

const { STRING, INTEGER, FLOAT } = DataTypes;

class Settings extends Model {}

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