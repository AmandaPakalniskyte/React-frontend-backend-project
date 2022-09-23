const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

module.exports = {
  hashPassword,
  comparePasswords,
};
