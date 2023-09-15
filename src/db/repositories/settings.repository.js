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
      include: ['shrinkTime', 'difficulty', 'circleColor', 'circleSize'],
      exclude: ['id', 'userId', 'updatedAt', 'createdAt'],
    },
  });

const updateSettings = async ({ settingsId, userId, shrinkTime, difficulty, circleColor, circleSize }) =>
  Settings.update(
    {
      shrinkTime,
      difficulty,
      circleColor,
      circleSize,
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
