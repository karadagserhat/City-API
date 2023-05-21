const multer = require('multer');
const sharp = require('sharp');
const tour = require('../models/tourModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();

// Test if the uploaded file is an image. If it so, then we pass true into cb function...
// if is not we pass false into cb function, along with an error.
const multerFiter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFiter,
});

// exports.uploadLocImages = upload.fields([{ name: 'images', maxCount: 3 }]);
exports.uploadLocImages = upload.array('images', 1);

exports.resizeLocImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];

  await Promise.all(
    req.files.map(async (file) => {
      const filename = `tour-${req.params.id}-${Date.now()}.jpeg`;

      // await sharp(req.files[0].buffer)
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.setCityUserIds = (req, res, next) => {
  // Allowed nested routes
  if (!req.body.city) req.body.city = req.params.cityId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAlltours = factory.getAll(tour);
exports.gettour = factory.getOne(tour);
exports.createtour = factory.createOne(tour);
exports.deletetour = factory.deleteOne(tour);
exports.updatetour = factory.updateOne(tour);
