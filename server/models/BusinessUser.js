const mongoose = require('mongoose');
const {ClubSchema} = require('./Club');
const {LocationSchema} = require('./Location');

const BusinessUserSchema = new mongoose.Schema({
  userName: {
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
    buildingNumber: {
      type: [Number, String],
      required: [true, 'enter building number']},
    street: String,
    town: String,
    postcode: {
      type: String, 
      required: [true, 'enter postcode']
    }  
  },
  location: LocationSchema,
  imageURL: String,
  clubs: [ClubSchema],
  review: [{userName: String, body: String }]
});

const BusinessUser = mongoose.model('businessUser', BusinessUserSchema);

module.export = BusinessUser;