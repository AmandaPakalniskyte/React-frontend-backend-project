const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const CupModel = require('../models/cup-model');
const createCupPopulatedViewModel = require('../view-models/create-cup-populated-view-model');
const createCupViewModel = require('../view-models/create-cup-view-model');

const createCupNotFoundError = (cupId) => createNotFoundError(`Cup with id '${cupId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy, id, price_lte, price_gte, categoryId } = req.query;
  const joinedDocuments = joinBy === 'categoryId';
  const filter = {};

  // Query by many cup id's
  if (id) filter._id = id instanceof Array ? { $in: id } : id;
  if (categoryId) filter.categoryId = categoryId instanceof Array ? { $in: categoryId } : categoryId;
  // Query by price range
  if (price_lte || price_gte) {
    filter.price = {};
    if (price_lte) filter.price.$lte = price_lte;
    if (price_gte) filter.price.$gte = price_gte;
  }

  try {
    const cupDocs = joinedDocuments
      ? await CupModel.find(filter).populate('categoryId')
      : await CupModel.find(filter);

    res.status(200).json(joinedDocuments
      ? cupDocs.map(createCupPopulatedViewModel)
      : cupDocs.map(createCupViewModel)
    );
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const cupId = req.params.id;
  const { joinBy } = req.query;
  const joinedDocument = joinBy === 'categoryId';

  try {
    const foundCupDoc = joinedDocument
      ? await CupModel.findById(cupId).populate('categoryId')
      : await CupModel.findById(cupId);
    if (foundCupDoc === null) throw createCupNotFoundError(cupId);

    res.status(200).json(joinedDocument
      ? createCupPopulatedViewModel(foundCupDoc)
      : createCupViewModel(foundCupDoc)
    );
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newCupData = req.body;

  try {
    await CupModel.validateData(newCupData);

    const newCupDoc = await CupModel.create(newCupData)

    res.status(201).json(createCupViewModel(newCupDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const cupId = req.params.id;
  const { title, description, categoryId, images, price } = req.body;
  const newCupData = { title, description, categoryId, images, price };

  try {
    await CupModel.validateData(newCupData);

    const updatedCupDoc = await CupModel.findByIdAndUpdate(
      cupId,
      newCupData,
      { new: true, runValidators: true }
    );

    if (updatedCupDoc === null) throw createCupNotFoundError(cupId);

    res.status(200).json(createCupViewModel(updatedCupDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const cupId = req.params.id;
  const { title, description, categoryId, images, price } = req.body;
  const newCupData = removeEmptyProps({ title, description, categoryId, images, price });

  try {
    await CupModel.validateUpdateData(newCupData);

    const updatedCupDoc = await CupModel.findByIdAndUpdate(
      cupId,
      newCupData,
      { new: true }
    );

    if (updatedCupDoc === null) throw createCupNotFoundError(cupId);

    res.status(200).json(createCupViewModel(updatedCupDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const cupId = req.params.id;

  try {
    const deletedCupDoc = await CupModel.findByIdAndDelete(cupId);
    if (deletedCupDoc === null) createCupNotFoundError(cupId);

    res.status(200).json(createCupViewModel(deletedCupDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const getPriceRange = async (req, res) => {
  const [priceRange] = await CupModel.aggregate(
    [
      {
        $group:
        {
          _id: {},
          min: { $min: "$price" },
          max: { $max: "$price" }
        }
      }
    ]
  );

  res.status(200).json([priceRange.min, priceRange.max]);
}

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
  getPriceRange,
};
