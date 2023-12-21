const gameRepository = require('../db/repositories/game.repository');
const statsRepository = require('../db/repositories/stats.repository');

module.exports.post = async (req, res) => {
  const { statsId, userId, score, time, stats } = req.body;

  try {
    let { totalGames, highScore, highTime } = stats;

    totalGames = totalGames + 1;
    highScore = score > highScore ? score : highScore;
    highTime = parseFloat(time, 10) > highTime ? parseFloat(time, 10) : highTime;

    const updateStats = await statsRepository.updateStats({
      statsId,
      userId,
      totalGames,
      highScore,
      highTime,
    });

    gameRepository.createGame({
      userId,
      score,
      time,
    });

    if (updateStats) {
      res.send({ totalGames, highScore, highTime });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports.get = async (req, res) => {
  const { userId, limit, offset } = req.query;
  const games = await gameRepository.getAllGames({ userId, limit, offset });
  res.send({ games });
};
