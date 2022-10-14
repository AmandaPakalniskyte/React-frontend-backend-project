const { Router } = require('express');
const {
  login,
  register,
  auth,
  checkEmail,
  updateProfile,
} = require('../controllers/auth-controller');
const { requireAuth } = require('../middleware/auth-middleware');
const { updloadSingle } = require('../middleware/file-upload-middleware');

const authRouter = Router();

authRouter.post('/', requireAuth, auth);

authRouter.post('/login', login);

authRouter.post('/register', register);

authRouter.post('/check-email', checkEmail);

authRouter.patch('/update-profile', requireAuth, updloadSingle('img'), updateProfile);

module.exports = authRouter;