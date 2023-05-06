const express = require('express');
const cityController = require('../controllers/cityController');
const authController = require('../controllers/authController');
const locationRouter = require('./locationRoutes');

const router = express.Router();

// POST /city/45454/locations
// GET /city/45454/locations
// GET /city/45454/locations/8675753
router.use('/:cityId/locations', locationRouter);

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
