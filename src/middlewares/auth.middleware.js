const jwt = require('../util/jwt.util');
const { UNAUTHORIZED } = require('../constants');

module.exports.jwt = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(UNAUTHORIZED).error('Missing token');
  }

  try {
    req.context = {
      ...req.context,
      user: jwt.verify(token),
    };

    next();
  } catch (error) {
    res.status(UNAUTHORIZED).error('Unauthorized');
  }
};

