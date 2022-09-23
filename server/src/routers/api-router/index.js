const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const cupsRouter = require('./cups-router');
const usersRouter = require('./users-router');
const cartItemsRouter = require('./cart-items-router');

const apiRouter = Router();

apiRouter.use('/cups', cupsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/cart-items', cartItemsRouter);

module.exports = apiRouter;
