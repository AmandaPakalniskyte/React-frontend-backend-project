const { createNotFoundError, sendErrorResponse, createBadDataError } = require('../helpers/errors');
const { hashPassword, comparePasswords } = require('../helpers/password-encryption');
const { createToken } = require('../helpers/token');
const { removePublicAsset } = require('../helpers/public-asset-helpers');
const UserModel = require('../models/user-model');
const createUserViewModel = require('../view-models/create-user-view-model');

const login = async (req, res) => {
  const { email, password } = req.body;
  const crudentialExists = Boolean(email && password);

  try {
    if (!crudentialExists) throw new Error('Missing crudentials');
    const userDoc = await UserModel.findOne({ email });

    if (userDoc === null) throw createNotFoundError(`User with email '${email}' was not found.`);

    const passwordIsCorrect = await comparePasswords(password, userDoc.password);

    if (!passwordIsCorrect) throw new Error('Password is incorrect');

    res.status(200).json({
      user: createUserViewModel(userDoc),
      token: createToken({ email: userDoc.email, role: userDoc.role }),
    });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

const register = async (req, res) => {
  const requestData = req.body;

  try {
    await UserModel.validateData(requestData);
    const {
      email, password, img, firstName, surname,
    } = requestData;

    const userDoc = await UserModel.create({
      email,
      password: await hashPassword(password),
      img,
      firstName,
      surname,
    });

    res.status(201).json({
      user: createUserViewModel(userDoc),
      token: createToken({ email: userDoc.email, role: userDoc.role }),
    });
  } catch (err) { sendErrorResponse(err, res); }
};

const auth = async (req, res) => {
  res.status(201).json({
    user: createUserViewModel(req.authUser),
    token: createToken({ email: req.authUser.email, role: req.authUser.role }),
  });
};

const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) createBadDataError('Email was not found in request body');
    const foundUser = await UserModel.findOne({ email });

    res.status(200).json({ email, emailAvailable: foundUser === null });
  } catch (err) { sendErrorResponse(err, res); }
};

const updateProfile = async (req, res) => {
  const requestData = {
    img: req.file?.filename,
    firstName: req.body.firstName,
    surname: req.body.surname,
    street: req.body.street,
    houseNumber: req.body.houseNumber,
    apartmentNumber: req.body.apartmentNumber,
    city: req.body.city,
    email: req.body.email,
  };
  try {
    await UserModel.validateUpdateData(requestData);

    if (requestData.img) {
      if (req.authUser.img) {
        removePublicAsset(req.authUser.img);
      }
      req.authUser.img = requestData.img;
    }

    if (requestData.firstName) req.authUser.firstName = requestData.firstName;
    if (requestData.surname) req.authUser.surname = requestData.surname;
    if (requestData.street) req.authUser.street = requestData.street;
    if (requestData.houseNumber) req.authUser.houseNumber = requestData.houseNumber;
    if (requestData.apartmentNumber) req.authUser.apartmentNumber = requestData.apartmentNumber;
    if (requestData.city) req.authUser.city = requestData.city;
    if (requestData.email) req.authUser.email = requestData.email;

    await req.authUser.save();

    res.status(200).json({
      user: createUserViewModel(req.authUser),
      token: createToken({ email: req.authUser.email, role: req.authUser.role }),
    });
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  updateProfile,
  login,
  register,
  auth,
  checkEmail,
};
