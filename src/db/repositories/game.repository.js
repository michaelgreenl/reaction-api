const { sequelize } = require('../sequelize-connection.js');
const { Op } = require('sequelize');
const { Game } = require('../models');

const createGame = async ({ userId, score, time, settings }) =>
  Game.create({
    userId,
    score: parseInt(score, 10),
    time: parseFloat(time, 10),
    settings,
  });

const getGamesBySetting = async ({ userId, limit, offset, filters, sortedBy, sortedOrder }) => {
  const conditions = [{ userId }];

  for (const filter of filters) {
    conditions.push(
      sequelize.where(
        sequelize.cast(
          sequelize.fn('json_extract_path_text', sequelize.col('settings'), filter.filter),
          'DECIMAL(10,2)',
        ),
        filter.value,
      ),
    );
  }

  return Game.findAll({
    where: { [Op.and]: conditions },
    order: [[sortedBy, sortedOrder]],
    attributes: {
      include: ['score', 'time', 'settings', 'createdAt'],
      exclude: ['id', 'userId', 'updatedAt'],
    },
    limit: parseInt(limit, 10) || 10,
    offset: parseInt(offset, 10) || 0,
  });
};

const getAllGames = async ({ userId, limit, offset, sortedBy, sortedOrder }) =>
  Game.findAll({
    where: {
      userId,
    },
    order: [[sortedBy, sortedOrder]],
    attributes: {
      include: ['score', 'time', 'settings', 'createdAt'],
      exclude: ['id', 'userId', 'updatedAt'],
    },
    limit: parseInt(limit, 10) || 10,
    offset: parseInt(offset, 10) || 0,
  });

const deleteGames = async (userId) => Game.destroy({ where: { userId } });

module.exports = {
  getAllGames,
  getGamesBySetting,
  createGame,
  deleteGames,
};
