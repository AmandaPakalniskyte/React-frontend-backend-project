const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/sizes-controller');

const sizesRouter = Router();

sizesRouter.get('/', fetchAll);

sizesRouter.get('/:id', fetch);

sizesRouter.post('/', create);

sizesRouter.put('/:id', replace);

sizesRouter.patch('/:id', update);

sizesRouter.delete('/:id', remove);

module.exports = sizesRouter;