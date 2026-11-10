// Lets async controllers throw; Express 5 already forwards rejections, this keeps intent explicit.
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
