const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const SizeModel = require('../models/size-model');
const createSizeViewModel = require('../view-models/create-size-view-model');

const createSizeNotFoundError = (sizeId) => createNotFoundError(`Size with id '${sizeId}' was not found`);

const fetchAll = async (req, res) => {
  try {
    const sizeDocuments = await SizeModel.find();

    res.status(200).json(sizeDocuments.map(createSizeViewModel));
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const sizeId = req.params.id;

  try {
    const foundSizeDoc = await SizeModel.findById(sizeId);
    if (foundSizeDoc === null) throw createSizeNotFoundError(sizeId);

    res.status(200).json(createSizeViewModel(foundSizeDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newSizeData = req.body;

  try {
    await SizeModel.validateData(newSizeData);
    const newSizeDoc = await SizeModel.create(newSizeData)

    res.status(201).json(createSizeViewModel(newSizeDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const sizeId = req.params.id;
  const { title, image } = req.body;
  const newSizeData = { title, image };

  try {
    await SizeModel.validateData(newSizeData);

    const updatedSizeDoc = await SizeModel.findByIdAndUpdate(
      sizeId,
      newSizeData,
      { new: true, runValidators: true }
    );

    if (updatedSizeDoc === null) throw createSizeNotFoundError(sizeId);

    res.status(200).json(createSizeViewModel(updatedSizeDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const sizeId = req.params.id;
  const { title, image } = req.body;
  const newSizeData = removeEmptyProps({ title, image });

  try {
    await SizeModel.validateUpdateData(newSizeData);
    const updatedSizeDoc = await SizeModel.findByIdAndUpdate(
      sizeId,
      newSizeData,
      { new: true }
    );

    if (updatedSizeDoc === null) throw createSizeNotFoundError(sizeId);

    res.status(200).json(createSizeViewModel(updatedSizeDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const sizeId = req.params.id;

  try {
    const deletedSizeDoc = await SizeModel.findByIdAndDelete(sizeId);
    if (deletedSizeDoc === null) createSizeNotFoundError(sizeId);

    res.status(200).json(createSizeViewModel(deletedSizeDoc));
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
