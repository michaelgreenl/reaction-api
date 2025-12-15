const gameRepository = require('../db/repositories/game.repository');
const statsRepository = require('../db/repositories/stats.repository');

module.exports.post = async (req, res) => {
    const { userId, score, time, settings, stats } = req.body;

    try {
        let { totalGames, highScore, highTime } = stats;

        gameRepository.createGame({
            userId,
            score,
            time,
            settings,
        });

        totalGames = totalGames + 1;
        highScore = score > highScore ? score : highScore;
        highTime = parseFloat(time, 10) > highTime ? parseFloat(time, 10) : highTime;

        const updateStats = await statsRepository.updateStats({
            userId,
            totalGames,
            highScore,
            highTime,
        });

        res.send({ totalGames, highScore, highTime });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};

module.exports.get = async (req, res) => {
    try {
        const { userId, limit, offset, sortedBy, sortedOrder } = req.query;
        const games = await gameRepository.getAllGames({ userId, limit, offset, sortedBy, sortedOrder });
        res.send({ games });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};

module.exports.getGamesBySetting = async (req, res) => {
    try {
        const { userId, limit, offset, filters, sortedBy, sortedOrder } = req.query;

        const games = await gameRepository.getGamesBySetting({
            userId,
            limit,
            offset,
            filters: JSON.parse(filters),
            sortedBy,
            sortedOrder,
        });
        res.send({ games });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};

module.exports.remove = async (req, res) => {
    try {
        const { userId, statsId } = req.params;
        await gameRepository.deleteGames(userId);
        statsRepository.updateStats({ userId, totalGames: 0, highScore: 0, highTime: 0 });
        res.send();
    } catch (error) {
        res.send(error);
    }
};
