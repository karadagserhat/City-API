const express = require('express');
const locationController = require('../controllers/locationController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
// By default, Each router only have access to the parameters of their specific routes..
// We want to get access to cityId that was in other router(cityRoutes). We need 'mergeParams'

// POST /city/45454/locations
// GET /city/45454/locations
// GET /city/45454/locations/8675753
// POST /locations
router
  .route('/')
  .get(locationController.getAllLocations)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    locationController.setCityUserIds,
    locationController.createLocation
  );

router
  .route('/:id')
  .get(locationController.getLocation)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    locationController.uploadLocImages,
    locationController.resizeLocImages,
    locationController.updateLocation
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    locationController.deleteLocation
  );

module.exports = router;
