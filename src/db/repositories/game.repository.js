const { Game } = require('../models');

const createGame = async ({ userId, score, time, settings }) =>
  Game.create({
    userId,
    score: parseInt(score, 10),
    time: parseFloat(time, 10),
    settings,
  });

const getGamesBySetting = async ({ userId, limit, offset, filters }) => {
  const whereConditions = {
    userId,
  };

  for (const filter of filters) {
    whereConditions[`settings.${filter.filter}`] = filter.value;
  }

  return Game.findAll({
    where: whereConditions,
    order: [['createdAt', 'DESC']],
    attributes: {
      include: ['score', 'time', 'settings', 'createdAt'],
      exclude: ['id', 'userId', 'updatedAt'],
    },
    limit: parseInt(limit, 10) || 10,
    offset: parseInt(offset, 10) || 0,
  });
};

const getAllGames = async ({ userId, limit, offset, settings }) =>
  Game.findAll({
    where: {
      userId,
    },
    order: [['createdAt', 'DESC']],
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
