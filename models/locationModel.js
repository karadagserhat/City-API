const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['true', "Location can't be empty!"],
  },
  type: {
    type: String,
    default: 'Point',
    enum: ['Point'],
  },
  coordinates: [Number],
  cityName: String,
  //   cityName: String,
  address: String,
  details_url: String,
  images: [String],
  locDescription: String,
  city: {
    type: mongoose.Schema.ObjectId,
    ref: 'City',
    required: [true, 'Location must belong to a city'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Location must belong to a user'],
  },
});

// locationSchema.index({ city: 1, user: 1 }, { unique: true });

locationSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'city',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });

  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
