const settingsRepository = require('../db/repositories/settings.repository');

module.exports.post = async (req) => {
  const { settingsId, userId } = req.body;
  settingsRepository.createSettings({ settingsId, userId });
};

module.exports.get = async (req, res) => {
  try {
    const { settingsId, userId } = req.query;
    const settings = await settingsRepository.getSettingsById(settingsId, userId);
    res.json({ ...settings });
  } catch (error) {
    res.send(error);
  }
};

module.exports.put = async (req, res) => {
  try {

    const { settingsId, userId, shrinkTime, difficulty, circleColor, circleSize } = req.body;
    console.log(req.body);
    const settings = await settingsRepository.updateSettings({
      settingsId,
      userId,
      shrinkTime,
      difficulty,
      circleColor,
      circleSize,
    });
    res.send();
  } catch (error) {
    res.send(error);
  }
};
