
const { createUnauthorizedError, createForbiddenError, sendErrorResponse } = require('../helpers/errors');
const { decodeToken } = require('../helpers/token');
const UserModel = require('../models/user-model');

const requireAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      throw createUnauthorizedError('Unauthorized. Authorization header is not present.');
    }

    const [_prefix, token] = req.headers.authorization.split(' ');

    if (token === undefined) {
      throw createUnauthorizedError('Unauthorized. Token is not present.');
    }

    try {
      const { email, role } = decodeToken(token);

      const userDoc = await UserModel.findOne({ email, role });

      if (userDoc === null) {
        throw createUnauthorizedError('Unauthorized. User does not exist.');
      }
      req.authUser = userDoc;

      next();
    } catch (error) {
      throw createUnauthorizedError('Unauthorized. Token data is corrupt');
    }

  } catch (error) {
    sendErrorResponse(error, res);
  }
}

const requireUser = (req, res, next) => {
  requireAuth(req, res, () => {
    try {
      if (req.authUser.role !== 'USER') {
        throw createForbiddenError('Forbidden. You must have "USER" role');
      }

      next();
    } catch (error) {
      sendErrorResponse(error, res);
    }
  })
}

const requireAdmin = (req, res, next) => {
  requireAuth(req, res, () => {
    try {
      if (req.authUser.role !== 'ADMIN') {
        throw createForbiddenError('Forbidden. You must have "ADMIN" role');
      }

      next();
    } catch (error) {
      sendErrorResponse(error, res);
    }
  })
}

module.exports = {
  requireAuth,
  requireUser,
  requireAdmin,
}