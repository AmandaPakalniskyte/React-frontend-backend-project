const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const RequestError = require('./request-error');

const createBadDataError = (message) => new RequestError({ message, statusCode: 400 });
const createNotFoundError = (message) => new RequestError({ message, statusCode: 404 });
const createUnauthorizedError = (message) => new RequestError({ message, statusCode: 401 });
const createForbiddenError = (message) => new RequestError({ message, statusCode: 403 });

const sendErrorResponse = (err, res) => {
  let message;
  let status = 400;

  if (typeof err === 'string') {
    message = err;
  } else if (err instanceof RequestError) {
    message = err.message;
    status = err.statusCode;
  } else if (err instanceof JsonWebTokenError) {
    message = 'Authorization error. Invalid token data.';
    status = 401;
  } else if (err instanceof TokenExpiredError) {
    message = 'Authorization error. Token has expired';
    status = 401;
  } else if (err instanceof Error) {
    message = err.message;
  } else {
    message = 'Request handler error';
  }

  res.status(status).json({ message });
}

module.exports = {
  createBadDataError,
  createNotFoundError,
  createUnauthorizedError,
  createForbiddenError,
  sendErrorResponse,
  RequestError,
};