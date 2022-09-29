const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const { hashPassword } = require('../helpers/password-encryption');
const UserModel = require('../models/user-model');

const createUserNotFoundError = (userId) => createNotFoundError(`User with id '${userId}' was not found`);

const fetchAll = async (req, res) => {
  try {
    const usersDocs = await UserModel.find();

    res.status(200).json(usersDocs);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const userId = req.params.id;

  try {
    const foundUserDoc = await UserModel.findById(userId);
    if (foundUserDoc === null) throw createUserNotFoundError(userId);

    res.status(200).json(foundUserDoc);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const requestData = req.body;

  try {
    await UserModel.validateData(requestData);
    const {
      email,
      password,
      role,
      cartItems,
      img,
    } = requestData;

    const newUserDoc = await UserModel.create({
      email,
      password: await hashPassword(password),
      role,
      cartItems,
      img
    });

    res.status(201).json(newUserDoc)

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const userId = req.params.id;
  const requestData = req.body;

  try {
    await UserModel.validateData(requestData);
    const {
      email,
      password,
      role,
      cartItems,
      img,
    } = requestData;

    const userDoc = await UserModel.findById(userId);
    if (userDoc === null) throw createUserNotFoundError(userId);

    const replacedUserDoc = await UserModel.findOneAndReplace(
      { id: userId },
      {
        email,
        password: await hashPassword(password),
        role,
        cartItems,
        img,
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: userDoc.__v,
      },
      {
        new: true,
      }
    );

    res.status(200).json(replacedUserDoc)

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const userId = req.params.id;
  const requestData = req.body;

  try {
    await UserModel.validateUpdateData(requestData);
    const {
      email,
      password,
      role,
      cartItems,
      img,
    } = requestData;

    const updatedUserDoc = await UserModel.findByIdAndUpdate(
      userId,
      {
        email,
        password: password && await hashPassword(password),
        role,
        cartItems,
        img
      },
      { new: true }
    );

    if (updatedUserDoc === null) throw createUserNotFoundError(userId);

    res.status(200).json(updatedUserDoc)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (deletedUser === null) createUserNotFoundError(userId);

    res.status(200).json(deletedUser);
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};