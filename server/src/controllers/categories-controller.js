const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const CategoryModel = require('../models/category-model');
const createCategoryViewModel = require('../view-models/create-category-view-model');

const createCategoryNotFoundError = (categoryId) => createNotFoundError(`Category with id '${categoryId}' was not found`);

const fetchAll = async (req, res) => {
  try {
    const categoryDocuments = await CategoryModel.find();

    res.status(200).json(categoryDocuments.map(createCategoryViewModel));
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const foundCategoryDoc = await CategoryModel.findById(categoryId);
    if (foundCategoryDoc === null) throw createCategoryNotFoundError(categoryId);

    res.status(200).json(createCategoryViewModel(foundCategoryDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newCategoryData = req.body;

  try {
    await CategoryModel.validateData(newCategoryData);
    const newCategoryDoc = await CategoryModel.create(newCategoryData)

    res.status(201).json(createCategoryViewModel(newCategoryDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const categoryId = req.params.id;
  const { title, image } = req.body;
  const newCategoryData = { title, image };

  try {
    await CategoryModel.validateData(newCategoryData);

    const updatedCategoryDoc = await CategoryModel.findByIdAndUpdate(
      categoryId,
      newCategoryData,
      { new: true, runValidators: true }
    );

    if (updatedCategoryDoc === null) throw createCategoryNotFoundError(categoryId);

    res.status(200).json(createCategoryViewModel(updatedCategoryDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const categoryId = req.params.id;
  const { title, image } = req.body;
  const newCategoryData = removeEmptyProps({ title, image });

  try {
    await CategoryModel.validateUpdateData(newCategoryData);
    const updatedCategoryDoc = await CategoryModel.findByIdAndUpdate(
      categoryId,
      newCategoryData,
      { new: true }
    );

    if (updatedCategoryDoc === null) throw createCategoryNotFoundError(categoryId);

    res.status(200).json(createCategoryViewModel(updatedCategoryDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategoryDoc = await CategoryModel.findByIdAndDelete(categoryId);
    if (deletedCategoryDoc === null) createCategoryNotFoundError(categoryId);

    res.status(200).json(createCategoryViewModel(deletedCategoryDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
