/** Error with an HTTP status, thrown by services and turned into JSON by errorHandler. */
class AppError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }

  static badRequest(msg, details) { return new AppError(400, msg, details); }
  static unauthorized(msg = 'Authentication required') { return new AppError(401, msg); }
  static forbidden(msg = 'You do not have permission to do this') { return new AppError(403, msg); }
  static notFound(msg = 'Not found') { return new AppError(404, msg); }
  static conflict(msg) { return new AppError(409, msg); }
}

module.exports = AppError;
