const createSizeViewModel = (sizeDoc) => ({
    id: sizeDoc._id.toString(),
    title: categoryDoc.title,
    createdAt: sizeDoc.createdAt,
    updatedAt: sizeDoc.updatedAt,
  });
  
  module.exports = createSizeViewModel;