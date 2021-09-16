const mongoose = require('mongoose');
const { LocationSchema } = require('./Location');

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
    buildingNumber: {
      type: Number,
      required: [true, 'enter building number']
    },
    street: String,
    town: String,
    postcode: {
      type: String,
      required: [true, 'enter postcode']
    }
  },
  location: LocationSchema,
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

const Club = mongoose.model('club', ClubSchema);

module.exports = { Club, ClubSchema };
