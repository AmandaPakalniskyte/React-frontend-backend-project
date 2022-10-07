const { Router } = require('express');
const {
  login,
  register,
  auth,
} = require('../controllers/auth-controller');
const { requireAuth } = require('../middleware/auth-middleware');

const authRouter = Router();

authRouter.post('/', requireAuth, auth);

authRouter.post('/login', login);

authRouter.post('/register', register);

module.exports = authRouter;