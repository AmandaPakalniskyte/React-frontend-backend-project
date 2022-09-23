const createCartItemViewModel = (cartItemDoc) => ({
  paintingId: cartItemDoc.paintingId.toString(),
  amount: cartItemDoc.amount
})

module.exports = createCartItemViewModel;
