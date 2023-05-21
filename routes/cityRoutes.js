const express = require('express');
const cityController = require('../controllers/cityController');
const authController = require('../controllers/authController');
const tourRouter = require('./tourRoutes');

const router = express.Router();

// POST /city/45454/tours
// GET /city/45454/tours
// GET /city/45454/tours/8675753
router.use('/:cityId/tours', tourRouter);

router
  .route('/')
  .get(cityController.getAllCities)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    cityController.createCity
  );

router
  .route('/:id')
  .get(cityController.getCity)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    cityController.updateCity
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    cityController.deleteCity
  );

module.exports = router;
