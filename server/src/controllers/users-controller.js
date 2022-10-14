const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const { hashPassword } = require('../helpers/password-encryption');
const UserModel = require('../models/user-model');
const createUserViewModel = require('../view-models/create-user-view-model');

const createUserNotFoundError = (userId) => createNotFoundError(`User with id '${userId}' was not found`);

const fetchAll = async (req, res) => {
  try {
    const usersDocs = await UserModel.find();

    res.status(200).json(usersDocs.map(createUserViewModel));
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const userId = req.params.id;

  try {
    const foundUserDoc = await UserModel.findById(userId);
    if (foundUserDoc === null) throw createUserNotFoundError(userId);

    res.status(200).json(createUserViewModel(foundUserDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const requestData = req.body;

  try {
    await UserModel.validateData(requestData);
    const {
      email,
      password,
      firstName,
      surname,
      role,
      cartItems,
      favoredCups,
      img,
    } = requestData;

    const newUserDoc = await UserModel.create({
      email,
      password: await hashPassword(password),
      firstName,
      surname,
      role,
      cartItems,
      favoredCups,
      img
    });

    res.status(201).json(createUserViewModel(newUserDoc))

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
      firstName,
      surname,
      role,
      cartItems,
      favoredCups,
      img,
    } = requestData;

    const userDoc = await UserModel.findById(userId);
    if (userDoc === null) throw createUserNotFoundError(userId);

    const replacedUserDoc = await UserModel.findOneAndReplace(
      { id: userId },
      {
        email,
        password: await hashPassword(password),
        firstName,
        surname,
        role,
        cartItems,
        favoredCups,
        img,
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: userDoc.__v,
      },
      {
        new: true,
      }
    );

    res.status(200).json(createUserViewModel(replacedUserDoc))

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
      firstName,
      surname,
      cartItems,
      favoredCups,
      img,
    } = requestData;

    const updatedUserDoc = await UserModel.findByIdAndUpdate(
      userId,
      {
        email,
        password: password && await hashPassword(password),
        role,
        firstName,
        surname,
        cartItems,
        favoredCups,
        img
      },
      { new: true }
    );

    if (updatedUserDoc === null) throw createUserNotFoundError(userId);

    res.status(200).json(createUserViewModel(updatedUserDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUserDoc = await UserModel.findByIdAndDelete(userId);
    if (deletedUserDoc === null) createUserNotFoundError(userId);

    res.status(200).json(createUserViewModel(deletedUserDoc));
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