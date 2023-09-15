const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const timestampConfig = require('../timestamp.config');

const { UUID, UUIDV4, STRING, BOOLEAN } = DataTypes;

class User extends Model {}

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

User.init(userDTO, {
  ...timestampConfig.tableOptions,
  sequelize,
  tableName: 'user',
});

const applyAssociations = (models) => {
  const { Settings, Stats, Game } = models;

  User.hasOne(Settings);
  User.hasOne(Stats);
  User.hasMany(Game);
};

module.exports = {
  model: User,
  userDTO,
  applyAssociations,
};
