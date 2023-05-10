const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET locations on city
    let filter = {};
    if (req.params.cityId) filter = { city: req.params.cityId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    const modelName = Model.modelName.toLowerCase();

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        [modelName]: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id).select('-__v');
    if (popOptions) query = query.populate(popOptions);
    // if(popOptions) query = query.populate('locations');

    const doc = await query;

    const modelName = Model.modelName.toLowerCase();

    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    const modelName = Model.modelName.toLowerCase();

    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    const modelName = Model.modelName.toLowerCase();

    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    const modelName = Model.modelName.toLowerCase();

    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    res.status(204).json({
      status: 'success',
      [modelName]: null,
    });
  });
