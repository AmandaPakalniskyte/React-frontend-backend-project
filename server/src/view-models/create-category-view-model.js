const createCategoryViewModel = (categoryDoc) => ({
  id: categoryDoc._id.toString(),
  label: categoryDoc.label,
  createdAt: categoryDoc.createdAt,
  updatedAt: categoryDoc.updatedAt,
});

module.exports = createCategoryViewModel;