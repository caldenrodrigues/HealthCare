var mongoose = require('mongoose');

module.exports = mongoose.model("general", {
    questions: String,
    answers: String
});