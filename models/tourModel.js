const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
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
    required: [true, 'tour must belong to a city'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'tour must belong to a user'],
  },
});

// tourSchema.index({ city: 1, user: 1 }, { unique: true });

// tourSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'city',
//     select: 'name',
//   }).populate({
//     path: 'user',
//     select: 'name photo',
//   });

//   this.populate({
//     path: 'user',
//     select: 'name photo',
//   });

//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
