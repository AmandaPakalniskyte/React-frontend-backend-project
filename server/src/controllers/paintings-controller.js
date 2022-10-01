const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const PaintingModel = require('../models/painting-model');
const createPaintingPopulatedViewModel = require('../view-models/create-painting-populated-view-model');
const createPaintingViewModel = require('../view-models/create-painting-view-model');

const createPaintingNotFoundError = (paintingId) => createNotFoundError(`Painting with id '${paintingId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;
  const joinedDocuments = joinBy === 'categoryId';

  try {
    const paintingDocs = joinedDocuments
      ? await PaintingModel.find().populate('categoryId')
      : await PaintingModel.find();

    res.status(200).json(joinedDocuments
      ? paintingDocs.map(createPaintingPopulatedViewModel)
      : paintingDocs.map(createPaintingViewModel)
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
  const { title, author, description, categoryId, sizeId, img, imgWall, price } = req.body;
  const newPaintingData = { title, author, description, categoryId, sizeId, img, imgWall, price };

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
  const { title, author, description, categoryId, sizeId, img, imgWall, price } = req.body;
  const newPaintingData = removeEmptyProps({ title, author, description, categoryId, sizeId, img, imgWall, price });

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

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};