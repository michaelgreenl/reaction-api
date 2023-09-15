const bcrypt = require('bcrypt');
const userRepository = require('../db/repositories/user.repository');
const statsRepository = require('../db/repositories/stats.repository');
const gameRepository = require('../db/repositories/game.repository');
const settingsRepository = require('../db/repositories/settings.repository');
const jwt = require('../util/jwt.util');
const { UNAUTHORIZED, NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../constants');

module.exports.get = async (req, res) => {
  const { limit, offset } = req.query;
  res.send({ users: await userRepository.getAllUsers({ limit, offset }) });
};

module.exports.post = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({ username, password: hash });

    let userData = { ...user.dataValues };
    delete userData.password;
    const token = jwt.sign({ userData });

    const { id, settingsId, statsId } = user;
    await statsRepository.createStats({ statsId, userId: id });
    await settingsRepository.createSettings({ settingsId, userId: id });
    res.send({ id, statsId, settingsId, token });
  } catch (error) {
    if (error.errors && error.errors[0].type === 'unique violation') {
      res.status(UNPROCESSABLE_ENTITY).json({ message: 'Username is already in use.' });
    } else {
      res.send(error);
    }
  }
};

module.exports.put = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await userRepository.updateUserInfo({ userId, username, password: hash });
    res.send();
  } catch (error) {
    if (error.errors && error.errors[0].type === 'unique violation') {
      res.status(UNPROCESSABLE_ENTITY).json({ message: 'Username is already in use.' });
    } else {
      res.send(error);
    }
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { userId } = req.params;
    await userRepository.deleteUser(userId);
    await statsRepository.deleteStats(userId);
    await gameRepository.deleteGames(userId);
    await settingsRepository.deleteSettings(userId);
    res.send();
  } catch (error) {
    res.send(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await userRepository.getUserWithPasswordByUsername(username);
    if (!user) {
      res.status(NOT_FOUND).json({ message: "There isn't an account linked with that username." });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    delete user.password;
    if (!match) {
      res.status(UNAUTHORIZED).json({ message: 'Your password was incorrect.' });
      return;
    }

    const token = jwt.sign({ user });
    user = { ...user };
    res.send({ ...user, token });
  } catch (error) {
    res.send(error);
  }
};
