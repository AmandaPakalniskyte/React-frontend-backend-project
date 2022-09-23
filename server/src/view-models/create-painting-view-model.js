const createPaintingViewModel = (paintingDoc) => ({
  id: paintingDoc._id.toString(),
  title: paintingDoc.title,
  description: paintingDoc.description,
  categoryId: paintingDoc.categoryId.toString(),
  images: paintingDoc.images,
  price: paintingDoc.price,
  createdAt: paintingDoc.createdAt,
  updatedAt: paintingDoc.updatedAt,
});

module.exports = createPaintingViewModel;