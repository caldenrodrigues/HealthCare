var mongoose = require('mongoose');

module.exports = mongoose.model("patients", {
    name: String,
    age: Number,
    contact: String,
    address: String,
    emailid: String
});