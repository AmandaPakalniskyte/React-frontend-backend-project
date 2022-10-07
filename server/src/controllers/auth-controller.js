const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const { hashPassword, comparePasswords } = require('../helpers/password-encryption');
const { createToken } = require('../helpers/token');
const UserModel = require('../models/user-model');
const createUserViewModel = require('../view-models/create-user-view-model');

const login = async (req, res) => {
  const { email, password } = req.body;
  const credentialExists = Boolean(email && password);

  try {
    if (!credentialExists) throw new Error('Missing credentials');
    const userDoc = await UserModel.findOne({ email });

    if (userDoc === null) throw createNotFoundError(`User with email '${email}' was not found.`);

    const passwordIsCorrect = await comparePasswords(password, userDoc.password);

    if (!passwordIsCorrect) throw new Error(`Password is incorrect`);

    res.status(200).json({
      user: createUserViewModel(userDoc),
      token: createToken({ email: userDoc.email, role: userDoc.role })
    });
  } catch (err) {
    sendErrorResponse(err, res);
  }
}

const register = async (req, res) => {
  const requestData = req.body;

  try {
    await UserModel.validateData(requestData);
    const { email, password, img, firstName, surname } = requestData;

    const userDoc = await UserModel.create({
      email,
      password: await hashPassword(password),
      img,
      firstName,
      surname
    });

    res.status(201).json({
      user: createUserViewModel(userDoc),
      token: createToken({ email: userDoc.email, role: userDoc.role })
    })

  } catch (err) { sendErrorResponse(err, res); }
};

const auth = async (req, res) => {
  res.status(201).json({
    user: createUserViewModel(req.authUser),
    token: createToken({ email: req.authUser.email, role: req.authUser.role }),
  });
};


module.exports = {
  login,
  register,
  auth,
};