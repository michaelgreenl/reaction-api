const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const timestampConfig = require('../timestamp.config');

const { UUID, UUIDV4, STRING, INTEGER, FLOAT, JSONB } = DataTypes;

class Game extends Model {}

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
  settings: {
    type: JSONB,
    allowNull: false,
  },
  ...timestampConfig.fields,
};

Game.init(gameDTO, {
  ...timestampConfig.tableOptions,
  sequelize,
  tableName: 'game',
});

const applyAssociations = (models) => {
  const { User } = models;

  Game.belongsTo(User);
};

module.exports = {
  model: Game,
  gameDTO,
  applyAssociations,
};
