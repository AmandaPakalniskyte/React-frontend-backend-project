const createCategoryViewModel = require("./create-category-view-model");

const createPaintingPopulatedViewModel = (paintingPopulatedDoc) => ({
  id: paintingPopulatedDoc._id.toString(),
  title: paintingPopulatedDoc.title,
  description: paintingPopulatedDoc.description,
  category: createCategoryViewModel(paintingPopulatedDoc.categoryId),
  images: paintingPopulatedDoc.images,
  price: paintingPopulatedDoc.price,
  createdAt: paintingPopulatedDoc.createdAt,
  updatedAt: paintingPopulatedDoc.updatedAt,
});

module.exports = createPaintingPopulatedViewModel;