const UserModel = require('../models/user-model');
const createCartItemViewModel = require('../view-models/create-cart-item-view-model');
const {
  createBadDataError,
  createNotFoundError,
  sendErrorResponse,
} = require('../helpers/errors');

const findCup = (cartItems, id) => cartItems.find((item) => item.cupId.toString() === id);

const fetchAll = (req, res) => {
  res.status(200).json(req.authUser.cartItems.map(createCartItemViewModel))
}

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCartItem(data);

    const foundCup = findCup(req.authUser.cartItems, data.cupId);
    if (foundCup) throw createBadDataError('Cup already exist in cart');

    const newCartItemDoc = {
      cupId: data.cupId,
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
    cupId: req.params.id,
    amount: req.body.amount,
  }

  try {
    await UserModel.validateCartItem(data);

    const foundCartItemDoc = findCup(req.authUser.cartItems, data.cupId);
    if (!foundCartItemDoc) throw createNotFoundError('Cup does not exist in cart');

    foundCartItemDoc.amount = data.amount;

    await req.authUser.save();

    res.status(200).json(createCartItemViewModel(foundCartItemDoc))
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const remove = async (req, res) => {
  const cupId = req.params.id;

  try {
    const foundCartItemDoc = findCup(req.authUser.cartItems, cupId);
    if (!foundCartItemDoc) throw createNotFoundError('Cup does not exist in cart');

    req.authUser.cartItems = req.authUser.cartItems.filter(x => x.cupId.toString() !== cupId);

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
