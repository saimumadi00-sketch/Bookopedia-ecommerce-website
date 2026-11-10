const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/AppError');

/** Verifies the Bearer JWT and attaches { id, role, email } to req.user. */
function authenticate(req, _res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return next(AppError.unauthorized());
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = { id: Number(payload.sub), role: payload.role, email: payload.email };
    return next();
  } catch {
    return next(AppError.unauthorized('Session expired or invalid. Please log in again.'));
  }
}

/** RBAC guard: requireRole('Admin') or requireRole('Customer', 'Admin'). */
function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(AppError.unauthorized());
    if (!roles.includes(req.user.role)) return next(AppError.forbidden());
    return next();
  };
}

function signToken(user) {
  return jwt.sign({ role: user.role, email: user.email }, env.jwtSecret, {
    subject: String(user.user_id),
    expiresIn: env.jwtExpiresIn,
  });
}

module.exports = { authenticate, requireRole, signToken };
