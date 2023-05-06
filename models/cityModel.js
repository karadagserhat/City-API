const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A city must have a name'],
      unique: true,
      trim: true,
      lowercase: true,
      // prettier-ignore
      maxlength: [40, 'A city name must have less or equal than 40 characters!'],
      minlength: [2, 'A city name must have more or equal than 2 characters!'],
    },
    cityPlate: Number,
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    // locations: [
    //   {
    //     type: {
    //       type: String,
    //       default: 'Point',
    //       enum: ['Point'],
    //     },
    //     coordinates: [Number],
    //     cityName: String,
    //     locName: String,
    //     address: String,
    //     details_url: String,
    //     images: [String],
    //     cityDescription: String,
    //   },
    // ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

citySchema.index({ cityPlate: 1 });
citySchema.index({ slug: 1 });

// Virtual Populate
citySchema.virtual('locations', {
  ref: 'Location',
  foreignField: 'city',
  localField: '_id',
});

citySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v',
  });

  next();
});

const City = mongoose.model('City', citySchema);

module.exports = City;
