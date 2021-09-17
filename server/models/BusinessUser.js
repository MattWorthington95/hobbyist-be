const mongoose = require('mongoose');
const { ClubSchema } = require('./Club');
const { LocationSchema } = require('./Location');
const geocoder = require('../utils/geocoder.js');

const BusinessUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    trim: true
  },
  phoneNumber: Number,
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  website: {
    type: String,
    trim: true
  },
  name: String,
  address: {
    firstLine: {
      type: String,
      required: [true, 'enter your first line of address']
    },
    town: String,
    postcode: {
      type: String,
      required: [true, 'enter postcode']
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    },
    formattedAddress: String
  },
  imageURL: String,
  clubs: [ClubSchema],
  reviews: [{ username: String, body: String }]
});

BusinessUserSchema.pre('save', async function(next) {
  const location = await geocoder.geocode(this.address.firstLine);
  this.location = {
    type:  'Point',
    coordinates: [location[0].longitude, location[0].latitude],
    formattedAddress: location[0].formattedAddress
  };
  this.address = undefined;
  next();
});

const BusinessUser = mongoose.model('businessUser', BusinessUserSchema);

module.exports = BusinessUser;
