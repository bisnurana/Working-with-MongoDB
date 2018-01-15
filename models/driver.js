const mongoose = require('mongoose');
const LocationSchema = require('./location');
const Schema = mongoose.Schema;
const DriverSchema = new Schema({
  email: { type: String, required: true, unique: true },
  driving: { type: Boolean, default: false },
  geometry: LocationSchema
});
module.exports = mongoose.model('driver', DriverSchema);
