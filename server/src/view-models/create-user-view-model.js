const createCartItemViewModel = require("./create-cart-item-view-model");

const createUserViewModel = (userDoc) => ({
  id: userDoc._id.toString(),
  email: userDoc.email,
  role: userDoc.role,
  cartItems: userDoc.cartItems.map(createCartItemViewModel),
  img: userDoc.img,
  createdAt: userDoc.createdAt,
  updatedAt: userDoc.updatedAt,
});

module.exports = createUserViewModel;