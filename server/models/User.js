const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: String,
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
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
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    trim: true
  },
  age13: {
    type: Boolean,
    required: true
  }
});

UserSchema.post('save', async function () {
  return await geocoder(this);
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
