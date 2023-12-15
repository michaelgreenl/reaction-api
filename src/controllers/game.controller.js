const gameRepository = require('../db/repositories/game.repository');
const statsRepository = require('../db/repositories/stats.repository');

module.exports.post = async (req, res) => {
  const { userId, score, time, stats } = req.body;
  try {
    let { highScore, totalGames, averageScore, highTime, averageTime } = stats;

    totalGames = totalGames + 1;
    const updatedStats = {
      totalGames,
      highScore: score > highScore ? score : highScore,
      highTime: time > highTime ? time : highTime,
    };

    const newStats = await statsRepository.updateStats({ ...updatedStats });

    gameRepository.createGame({
      userId,
      score,
      time,
    });
    res.send({ newStats });
  } catch (error) {
    res.send(error);
  }
};

module.exports.get = async (req, res) => {
  const { userId } = req.query;
  const games = await gameRepository.getAllGames(userId);
  res.send({ games });
};