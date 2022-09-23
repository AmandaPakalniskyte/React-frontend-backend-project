const createCategoryViewModel = require("./create-category-view-model");

const createCupPopulatedViewModel = (cupPopulatedDoc) => ({
  id: cupPopulatedDoc._id.toString(),
  title: cupPopulatedDoc.title,
  description: cupPopulatedDoc.description,
  category: createCategoryViewModel(cupPopulatedDoc.categoryId),
  images: cupPopulatedDoc.images,
  price: cupPopulatedDoc.price,
  createdAt: cupPopulatedDoc.createdAt,
  updatedAt: cupPopulatedDoc.updatedAt,
});

module.exports = createCupPopulatedViewModel;