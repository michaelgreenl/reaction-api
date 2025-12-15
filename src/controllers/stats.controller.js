const statsRepository = require('../db/repositories/stats.repository');

module.exports.get = async (req, res) => {
    try {
        const { userId } = req.query;
        const stats = await statsRepository.getStatsById(userId);
        res.send({ stats });
    } catch (error) {
        res.send(error);
    }
};

module.exports.post = async (req) => {
    const { userId } = req.body;
    statsRepository.createStats({ userId });
};

module.exports.put = async (req, res) => {
    const { userId, highScore, totalGames, highTime } = req.body;
    const stats = await statsRepository.updateStats({
        userId,
        totalGames,
        highScore,
        highTime,
    });
    res.send({ stats });
};
