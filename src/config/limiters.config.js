const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const skip = (req) => (process.env.NODE_ENV === 'development' ? true : false);

module.exports.limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1500,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    skip,
});

module.exports.speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 1500,
    delayMs: (used, req) => {
        const delayAfter = req.slowDown.limit;
        return (used - delayAfter) * 500;
    },
    skip,
});
