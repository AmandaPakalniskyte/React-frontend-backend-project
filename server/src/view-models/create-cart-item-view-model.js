const createCartItemViewModel = (cartItemDoc) => ({
  cupId: cartItemDoc.cupId.toString(),
  amount: cartItemDoc.amount
})

module.exports = createCartItemViewModel;
