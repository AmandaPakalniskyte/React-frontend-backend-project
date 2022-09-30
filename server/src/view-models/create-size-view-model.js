const createSizeViewModel = (sizeDoc) => ({
    id: sizeDoc._id.toString(),
    label: sizeDoc.label,
    createdAt: sizeDoc.createdAt,
    updatedAt: sizeDoc.updatedAt,
  });
  
  module.exports = createSizeViewModel;