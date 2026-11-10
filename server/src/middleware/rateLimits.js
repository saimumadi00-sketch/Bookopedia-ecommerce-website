const rateLimit = require('express-rate-limit');

// NFR-07: throttle sign-in, registration and password recovery.
const make = (limit, windowMinutes, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: message },
  });

module.exports = {
  loginLimiter: make(Number(process.env.LOGIN_RATE_LIMIT) || 5, 15, 'Too many login attempts. Try again in 15 minutes.'),
  registerLimiter: make(10, 60, 'Too many accounts created from this address. Try again later.'),
  recoveryLimiter: make(5, 15, 'Too many password-reset requests. Try again later.'),
};
