const { Stats } = require('../models');

const createStats = async ({ statsId, userId }) =>
  Stats.create({
    id: statsId,
    userId,
  });

const deleteStats = async (userId) => Stats.destroy({ where: { userId } });

const getStatsById = (statsId, userId) =>
  Stats.findOne({
    where: {
      id: statsId,
      userId,
    },
    attributes: {
      exclude: ['id', 'userId', 'updatedAt', 'createdAt'],
      include: [
        'totalGames',
        'highScore',
        'highTime',
      ],
    },
  });

const updateStats = async ({
  statsId,
  userId,
  totalGames,
  highScore,
  highTime,
}) =>
  Stats.update(
    {
      totalGames,
      highScore,
      highTime,
    },
    {
      where: {
        id: statsId,
        userId,
      },
    }
  ).then(Boolean);

module.exports = {
  getStatsById,
  createStats,
  updateStats,
  deleteStats,
};
