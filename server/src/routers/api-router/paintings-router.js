const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
  getPriceRange,
} = require('../../controllers/paintings-controller');

const paintingsRouter = Router();

paintingsRouter.get('/', fetchAll);

paintingsRouter.get('/price-range', getPriceRange);

paintingsRouter.get('/:id', fetch);

paintingsRouter.post('/', create);

paintingsRouter.put('/:id', replace);

paintingsRouter.patch('/:id', update);

paintingsRouter.delete('/:id', remove);

module.exports = paintingsRouter;
