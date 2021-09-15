const mongoose = require('mongoose');


const LocationSchema = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String, 
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  }
});

const Location = mongoose.model('location', LocationSchema);

module.export = {Location, LocationSchema};