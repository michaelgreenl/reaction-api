const { Settings } = require('../models');

const createSettings = async ({ userId }) =>
    Settings.create({
        userId,
    });

const getSettingsById = async (userId) =>
    Settings.findOne({
        where: {
            userId,
        },
        attributes: {
            include: ['circleSize', 'spawnInterval', 'shrinkTime'],
            exclude: ['id', 'userId', 'updatedAt', 'createdAt'],
        },
    });

const updateSettings = async ({ userId, circleSize, spawnInterval, shrinkTime }) =>
    Settings.update(
        {
            circleSize,
            spawnInterval,
            shrinkTime,
        },
        {
            where: {
                userId,
            },
        },
    );

const deleteSettings = async (userId) => Settings.destroy({ where: { userId } });

module.exports = {
    createSettings,
    getSettingsById,
    updateSettings,
    deleteSettings,
};
