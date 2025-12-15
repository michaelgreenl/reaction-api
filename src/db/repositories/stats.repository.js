const { Stats } = require('../models');

const createStats = async ({ userId }) =>
    Stats.create({
        userId,
    });

const deleteStats = async (userId) => Stats.destroy({ where: { userId } });

const getStatsById = (userId) =>
    Stats.findOne({
        where: {
            userId,
        },
        attributes: {
            exclude: ['userId', 'updatedAt', 'createdAt'],
            include: ['totalGames', 'highScore', 'highTime'],
        },
    });

const updateStats = async ({ userId, totalGames, highScore, highTime }) =>
    Stats.update(
        {
            totalGames,
            highScore,
            highTime,
        },
        {
            where: {
                userId,
            },
        },
    ).then(Boolean);

module.exports = {
    getStatsById,
    createStats,
    updateStats,
    deleteStats,
};
