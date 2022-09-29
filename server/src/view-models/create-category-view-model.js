const createCategoryViewModel = (categoryDoc) => ({
  id: categoryDoc._id.toString(),
  title: categoryDoc.title,
  createdAt: categoryDoc.createdAt,
  updatedAt: categoryDoc.updatedAt,
});

module.exports = createCategoryViewModel;