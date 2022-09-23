const isStatusCode = (code) => typeof code === 'number' && code >= 100 && code <= 599;

class RequestError extends Error {
  constructor({ message, statusCode }) {
    super(message);
    if (!isStatusCode(statusCode)) {
      throw TypeError(`Incorrect status code '${statusCode}'`);
    }
    this.statusCode = statusCode;
  }
}

module.exports = RequestError;