const statsRepository = require('../db/repositories/stats.repository');

module.exports.get = async (req, res) => {
  try {
    const { statsId, userId } = req.query;
    const stats = await statsRepository.getStatsById(statsId, userId);
    res.send({ stats });
  } catch (error) {
    res.send(error);
  }
};

module.exports.post = async (req) => {
  const { statsId, userId } = req.body;
  statsRepository.createStats({ statsId, userId });
};

module.exports.put = async (req, res) => {
  const { id, userId, highScore, totalGames, highTime } = req.body;
  const stats = await statsRepository.updateStats({
    id,
    userId,
    totalGames,
    highScore,
    highTime,
  });
  res.send({ stats });
};
