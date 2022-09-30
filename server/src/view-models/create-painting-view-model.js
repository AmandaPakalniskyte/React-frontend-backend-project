const createPaintingViewModel = (paintingDoc) => ({
  id: paintingDoc._id.toString(),
  title: paintingDoc.title,
  author: paintingDoc.author,
  description: paintingDoc.description,
  categoryId: paintingDoc.categoryId.toString(),
  sizeId: paintingDoc.sizeId.toString(),
  img: paintingDoc.img,
  imgWall: paintingDoc.imgWall,
  price: paintingDoc.price,
  createdAt: paintingDoc.createdAt,
  updatedAt: paintingDoc.updatedAt,
});

module.exports = createPaintingViewModel;