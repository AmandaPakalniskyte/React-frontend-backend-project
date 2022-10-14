const createCartItemViewModel = require("./create-cart-item-view-model");
const { SERVER_PROTOCOL, SERVER_DOMAIN, SERVER_PORT } = process.env;

const createUserViewModel = (userDoc) => ({
  id: userDoc._id.toString(),
  email: userDoc.email,
  firstName: userDoc.firstName,
  surname: userDoc.surname,
  role: userDoc.role,
  cartItems: userDoc.cartItems.map(createCartItemViewModel),
  img: userDoc.img ? `${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}/${userDoc.img}` : undefined,
  createdAt: userDoc.createdAt,
  updatedAt: userDoc.updatedAt,
});

module.exports = createUserViewModel;