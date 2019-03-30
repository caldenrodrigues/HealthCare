var mongoose = require('mongoose');

module.exports = mongoose.model("Prescription", {
    patientid: String,
    name: {
        type: String,
        required: true
    },
    age: Number,
    date: {
        type: Date,
        default: Date.now
    },
    appointment_date: Date,
    diagnose_with: {
        type: String,
        required: true
    },
    drugs: [{
        name: String,
        unit: String,
        dosage: {
            type: Number,
            min: 1,
            max: 3,
            required: true
        }
    }],
    doctor_name: {
        type: String,
        required: true
    },
    precautions: [{
      type: String  
    }]
}); 