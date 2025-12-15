const settingsRepository = require('../db/repositories/settings.repository');

module.exports.post = async (req) => {
    const { userId } = req.body;
    settingsRepository.createSettings({ userId });
};

module.exports.get = async (req, res) => {
    try {
        const { userId } = req.query;
        const settings = await settingsRepository.getSettingsById(userId);
        res.json({ ...settings });
    } catch (error) {
        res.send(error);
    }
};

module.exports.put = async (req, res) => {
    try {
        const { userId, circleSize, spawnInterval, shrinkTime } = req.body;
        await settingsRepository.updateSettings({
            userId,
            circleSize,
            spawnInterval,
            shrinkTime,
        });
        res.json({ ok: true });
    } catch (error) {
        res.send(error);
    }
};
