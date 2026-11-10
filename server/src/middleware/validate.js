const { validationResult } = require('express-validator');
const xss = require('xss');
const AppError = require('../utils/AppError');

/** Runs after express-validator chains; returns 400 with field messages. */
function validate(req, _res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const details = result.array().map((e) => ({ field: e.path, message: e.msg }));
  return next(AppError.badRequest('Validation failed', details));
}

/** Strips script/HTML from every string in the request body (NFR-07). Passwords are left untouched. */
const SKIP = new Set(['password', 'newPassword', 'currentPassword']);
function clean(value, key) {
  if (typeof value === 'string') return SKIP.has(key) ? value : xss(value.trim(), { whiteList: {}, stripIgnoreTag: true, stripIgnoreTagBody: ['script'] });
  if (Array.isArray(value)) return value.map((v) => clean(v));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, clean(v, k)]));
  }
  return value;
}
function sanitizeBody(req, _res, next) {
  if (req.body && typeof req.body === 'object') req.body = clean(req.body);
  next();
}

module.exports = { validate, sanitizeBody };
