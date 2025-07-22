const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const timestampConfig = require('../timestamp.config');

const { UUID, UUIDV4, STRING, INTEGER, FLOAT } = DataTypes;

class Game extends Model {}

const gameDTO = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
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
