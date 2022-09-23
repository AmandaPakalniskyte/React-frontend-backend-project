const UserModel = require('../models/user-model');
const createCartItemViewModel = require('../view-models/create-cart-item-view-model');
const {
  createBadDataError,
  createNotFoundError,
  sendErrorResponse,
} = require('../helpers/errors');

const findPainting = (cartItems, id) => cartItems.find((item) => item.paintingId.toString() === id);

const fetchAll = (req, res) => {
  res.status(200).json(req.authUser.cartItems.map(createCartItemViewModel))
}

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCartItem(data);

    const foundPainting = findPainting(req.authUser.cartItems, data.paintingId);
    if (foundPainting) throw createBadDataError('Painting already exist in cart');

    const newCartItemDoc = {
      paintingId: data.paintingId,
      amount: data.amount,
    }

    req.authUser.cartItems.push(newCartItemDoc);

    await req.authUser.save()

    res.status(200).json(createCartItemViewModel(newCartItemDoc))
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const update = async (req, res) => {
  const data = {
    paintingId: req.params.id,
    amount: req.body.amount,
  }

  try {
    await UserModel.validateCartItem(data);

    const foundCartItemDoc = findPainting(req.authUser.cartItems, data.paintingId);
    if (!foundCartItemDoc) throw createNotFoundError('Painting does not exist in cart');

    foundCartItemDoc.amount = data.amount;

    await req.authUser.save();

    res.status(200).json(createCartItemViewModel(foundCartItemDoc))
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const remove = async (req, res) => {
  const paintingId = req.params.id;

  try {
    const foundCartItemDoc = findPainting(req.authUser.cartItems, paintingId);
    if (!foundCartItemDoc) throw createNotFoundError('Painting does not exist in cart');

    req.authUser.cartItems = req.authUser.cartItems.filter(x => x.paintingId.toString() !== paintingId);

    await req.authUser.save();

    res.status(200).json(createCartItemViewModel(foundCartItemDoc));
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

module.exports = {
  fetchAll,
  create,
  update,
  remove,
};
