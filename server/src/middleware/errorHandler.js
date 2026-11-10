const env = require('../config/env');

function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Malformed JSON body' });
  }
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'A record with the same unique value already exists' });
  }
  if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
    return res.status(409).json({ error: 'This record is still in use and cannot be deleted' });
  }
  const status = err.status || 500;
  if (status >= 500 && !env.isTest) console.error(err);
  const body = { error: status >= 500 ? 'Internal server error' : err.message };
  if (err.details) body.details = err.details;
  return res.status(status).json(body);
}

module.exports = { notFound, errorHandler };
