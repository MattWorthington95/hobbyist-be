const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder.js');

const ClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    trim: true
  },
  phoneNumber: Number,
  ageGroup: {
    type: String,
    required: [true, 'Please choose the age group available'],
    enum: [
      'toddler',
      'pre-school',
      'primary-school',
      'secondary',
      'young adult',
      'adult'
    ]
  },
  level: {
    type: String,
    required: [true, 'Please choose club level'],
    enum: ['beginner', 'intermediate', 'advanced', 'all levels']
  },
  price: {
    type: Number,
    required: [true, 'Please enter the price per session']
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
  website: {
    type: String,
    trim: true
  },
  clubType: {
    type: String,
    required: [true, 'Choose type of your club'],
    enum: ['sport', 'art', 'music', 'other']
  },
  description: {
    type: String,
    required: true
  },
  hours: {
    monday: { open: Number, close: Number },
    tuesday: { open: Number, close: Number },
    wednesday: { open: Number, close: Number },
    thursday: { open: Number, close: Number },
    friday: { open: Number, close: Number },
    saturday: { open: Number, close: Number },
    sunday: { open: Number, close: Number }
  }
});

ClubSchema.post('save', function () {
  geocoder(this);
});

const Club = mongoose.model('club', ClubSchema);

module.exports = { Club, ClubSchema };
