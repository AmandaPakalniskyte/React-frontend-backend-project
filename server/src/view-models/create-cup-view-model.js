const createCupViewModel = (cupDoc) => ({
  id: cupDoc._id.toString(),
  title: cupDoc.title,
  description: cupDoc.description,
  categoryId: cupDoc.categoryId.toString(),
  images: cupDoc.images,
  price: cupDoc.price,
  createdAt: cupDoc.createdAt,
  updatedAt: cupDoc.updatedAt,
});

module.exports = createCupViewModel;