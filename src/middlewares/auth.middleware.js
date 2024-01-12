const jwt = require('../util/jwt.util');
const { UNAUTHORIZED } = require('../constants');

module.exports.jwt = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    req.context = {
      ...req.context,
      user: jwt.verify(token),
    };
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).error('Unauthorized');
  }
};