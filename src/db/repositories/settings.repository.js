const { Settings } = require('../models');

const createSettings = async ({ settingsId, userId }) =>
  Settings.create({
    id: settingsId,
    userId,
  });

const getSettingsById = async (settingsId, userId) =>
  Settings.findOne({
    where: {
      id: settingsId,
      userId,
    },
    attributes: {
      include: ['circleSize', 'shrinkTime', 'spawnInterval'],
      exclude: ['id', 'userId', 'updatedAt', 'createdAt'],
    },
  });

const updateSettings = async ({ settingsId, userId, circleSize, shrinkTime, spawnInterval }) =>
  Settings.update(
    {
      circleSize,
      shrinkTime,
      spawnInterval,
    },
    {
      where: {
        id: settingsId,
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
