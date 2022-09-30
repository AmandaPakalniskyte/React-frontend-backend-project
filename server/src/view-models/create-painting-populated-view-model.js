const createCategoryViewModel = require("./create-category-view-model");

const createPaintingPopulatedViewModel = (paintingPopulatedDoc) => ({
  id: paintingPopulatedDoc._id.toString(),
  title: paintingPopulatedDoc.title,
  author: paintingPopulatedDoc.author,
  description: paintingPopulatedDoc.description,
  category: createCategoryViewModel(paintingPopulatedDoc.categoryId),
  img: paintingPopulatedDoc.img,
  imgWall: paintingDoc.imgWall,
  price: paintingPopulatedDoc.price,
  createdAt: paintingPopulatedDoc.createdAt,
  updatedAt: paintingPopulatedDoc.updatedAt,
});

module.exports = createPaintingPopulatedViewModel;