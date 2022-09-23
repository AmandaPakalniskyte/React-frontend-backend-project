const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/users-controller');
const { requireAdmin } = require('../../middleware/auth-middleware');

const usersRouter = Router();

usersRouter.use(requireAdmin);
usersRouter.get('/', fetchAll);

// TODO: Leisti vartotojui manipuliuoti savo duomenims, arba admin
usersRouter.get('/:id', fetch);

usersRouter.post('/', create);

usersRouter.put('/:id', replace);

// TODO: Leisti vartotojui manipuliuoti savo duomenims, arba admin
usersRouter.patch('/:id', update);

// TODO: Leisti vartotojui manipuliuoti savo duomenims, arba admin
usersRouter.delete('/:id', remove);

module.exports = usersRouter;
