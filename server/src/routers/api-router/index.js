const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const sizesRouter = require('./sizes-router');
const paintingsRouter = require('./paintings-router');
const usersRouter = require('./users-router');
const cartItemsRouter = require('./cart-items-router');

const apiRouter = Router();

apiRouter.use('/paintings', paintingsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/sizes', sizesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/cart-items', cartItemsRouter);

module.exports = apiRouter;