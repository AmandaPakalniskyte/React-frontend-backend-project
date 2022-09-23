const { Router } = require('express');
const {
  fetchAll,
  create,
  update,
  remove,
} = require('../../controllers/cart-items-controller');
const { requireUser } = require('../../middleware/auth-middleware');

const cartItemsRouter = Router();
cartItemsRouter.use(requireUser);

cartItemsRouter.get('/', fetchAll);

cartItemsRouter.post('/', create);

cartItemsRouter.patch('/:id', update);

cartItemsRouter.delete('/:id', remove);

module.exports = cartItemsRouter;
