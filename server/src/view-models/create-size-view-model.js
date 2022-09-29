const createSizeViewModel = (sizeDoc) => ({
    id: sizeDoc._id.toString(),
    title: sizeDoc.title,
    createdAt: sizeDoc.createdAt,
    updatedAt: sizeDoc.updatedAt,
  });
  
  module.exports = createSizeViewModel;