const mongoose = require('mongoose');
const { LocationSchema } = require('./Location');

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
    buildingNumber: {
      type: Number
    },
    street: String,
    town: String,
    postcode: {
      type: String,
      required: [true, 'enter postcode']
    }
  },
  location: LocationSchema,
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

const User = mongoose.model('user', UserSchema);

module.exports = User;
