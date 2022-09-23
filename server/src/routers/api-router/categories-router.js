const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/categories-controller');

const categoriesRouter = Router();

categoriesRouter.get('/', fetchAll);

categoriesRouter.get('/:id', fetch);

categoriesRouter.post('/', create);

categoriesRouter.put('/:id', replace);

categoriesRouter.patch('/:id', update);

categoriesRouter.delete('/:id', remove);

module.exports = categoriesRouter;
