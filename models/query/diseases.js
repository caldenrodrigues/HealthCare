var mongoose = require('mongoose');

module.exports = mongoose.model("diseases", {
    fractures: [{
        question: String,
        answer: String
    }],
    heart_transplant: [{
        question: String,
        answer: String
    }]
});