const gameRepository = require('../db/repositories/game.repository');
const statsRepository = require('../db/repositories/stats.repository');

module.exports.post = async (req, res) => {
  const { userId, score, time, stats } = req.body;
  try {
    let { highScore, totalGames, averageScore, highTime, averageTime } = stats;

    totalGames = totalGames + 1;
    let updatedStats = {
      highScore: score > highScore ? score : highScore,
      totalGames,
      averageScore: averageScore + score / totalGames,
      highTime: time > highTime ? time : highTime,
      averageTime: averageTime + time / totalGames,
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