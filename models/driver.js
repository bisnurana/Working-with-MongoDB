const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Driver = new Schema({
    email: { type: String, required: true, unique: true },
    driving: { type: Boolean, default: false }
})
module.exports = mongoose.model('driver', Driver);