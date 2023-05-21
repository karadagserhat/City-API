const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
// By default, Each router only have access to the parameters of their specific routes..
// We want to get access to cityId that was in other router(cityRoutes). We need 'mergeParams'

// POST /city/45454/tours
// GET /city/45454/tours
// GET /city/45454/tours/8675753
// POST /tours
router
  .route('/')
  .get(tourController.getAlltours)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    tourController.setCityUserIds,
    tourController.createtour
  );

router
  .route('/:id')
  .get(tourController.gettour)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    tourController.uploadLocImages,
    tourController.resizeLocImages,
    tourController.updatetour
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    tourController.deletetour
  );

module.exports = router;
