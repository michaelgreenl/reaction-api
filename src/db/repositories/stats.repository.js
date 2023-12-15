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
  id,
  userId,
  highScore,
  totalGames,
  highTime,
}) =>
  Stats.update(
    {
      id,
      userId,
      highScore: parseInt(highScore, 10),
      totalGames: parseInt(totalGames, 10),
      highTime: parseFloat(highTime, 10),
    },
    {
      where: {
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
