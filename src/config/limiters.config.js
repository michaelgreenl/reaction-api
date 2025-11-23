const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports.speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 500,
  delayMs: (used, req) => {
    const delayAfter = req.slowDown.limit;
    return (used - delayAfter) * 500;
  },
});
