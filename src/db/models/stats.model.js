const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const timestampConfig = require('../timestamp.config');

const { STRING, INTEGER, FLOAT } = DataTypes;

class Stats extends Model {}

const statsDTO = {
  id: {
    type: STRING,
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
  averageScore: {
    type: INTEGER,
    defaultValue: 0,
  },
  highTime: {
    type: FLOAT,
    defaultValue: 0,
  },
  averageTime: {
    type: FLOAT,
    defaultValue: 0,
  },
  ...timestampConfig.fields,
};

Stats.init(statsDTO, {
  ...timestampConfig.tableOptions,
  sequelize,
  tableName: 'stats',
});

const applyAssociations = (models) => {
  const { User } = models;

  Stats.belongsTo(User);
};

module.exports = {
  model: Stats,
  statsDTO,
  applyAssociations,
};
