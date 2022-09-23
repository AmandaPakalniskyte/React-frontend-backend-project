const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const PaintingModel = require('../models/painting-model');
const createPaintingPopulatedViewModel = require('../view-models/create-painting-populated-view-model');
const createPaintingViewModel = require('../view-models/create-painting-view-model');

const createPaintingNotFoundError = (paintingId) => createNotFoundError(`Cup wPainting id '${paintingId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy, id, price_lte, price_gte, categoryId } = req.query;
  const joinedDocuments = joinBy === 'categoryId';
  const filter = {};

  // Query by many painting id's
  if (id) filter._id = id instanceof Array ? { $in: id } : id;
  if (categoryId) filter.categoryId = categoryId instanceof Array ? { $in: categoryId } : categoryId;
  // Query by price range
  if (price_lte || price_gte) {
    filter.price = {};
    if (price_lte) filter.price.$lte = price_lte;
    if (price_gte) filter.price.$gte = price_gte;
  }

  try {
    const paintingDocs = joinedDocuments
      ? await PaintingModel.find(filter).populate('categoryId')
      : await PaintingModel.find(filter);

    res.status(200).json(joinedDocuments
      ? paintingDocs.map(createCupPoPaintingatedViewModel)
      : paintingDocs.map(createCupViPaintingodel)
    );
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const paintingId = req.params.id;
  const { joinBy } = req.query;
  const joinedDocument = joinBy === 'categoryId';

  try {
    const foundPaintingDoc = joinedDocument
      ? await PaintingModel.findById(paintingId).populate('categoryId')
      : await PaintingModel.findById(paintingId);
    if (foundPaintingDoc === null) throw createPaintingNotFoundError(paintingId);

    res.status(200).json(joinedDocument
      ? createPaintingPopulatedViewModel(foundPaintingDoc)
      : createPaintingViewModel(foundPaintingDoc)
    );
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newPaintingData = req.body;

  try {
    await PaintingModel.validateData(newPaintingData);

    const newPaintingDoc = await PaintingModel.create(newPaintingData)

    res.status(201).json(createPaintingViewModel(newPaintingDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const paintingId = req.params.id;
  const { title, description, categoryId, images, price } = req.body;
  const newPaintingData = { title, description, categoryId, images, price };

  try {
    await PaintingModel.validateData(newPaintingData);

    const updatedPaintingDoc = await PaintingModel.findByIdAndUpdate(
      paintingId,
      newPaintingData,
      { new: true, runValidators: true }
    );

    if (updatedPaintingDoc === null) throw createPaintingNotFoundError(paintingId);

    res.status(200).json(createPaintingViewModel(updatedPaintingDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const paintingId = req.params.id;
  const { title, description, categoryId, images, price } = req.body;
  const newPaintingData = removeEmptyProps({ title, description, categoryId, images, price });

  try {
    await PaintingModel.validateUpdateData(newPaintingData);

    const updatedPaintingDoc = await PaintingModel.findByIdAndUpdate(
      paintingId,
      newPaintingData,
      { new: true }
    );

    if (updatedPaintingDoc === null) throw createPaintingNotFoundError(paintingId);

    res.status(200).json(createPaintingViewModel(updatedPaintingDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const paintingId = req.params.id;

  try {
    const deletedPaintingDoc = await PaintingModel.findByIdAndDelete(paintingId);
    if (deletedPaintingDoc === null) createPaintingNotFoundError(paintingId);

    res.status(200).json(createPaintingViewModel(deletedPaintingDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const getPriceRange = async (req, res) => {
  const [priceRange] = await PaintingModel.aggregate(
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
