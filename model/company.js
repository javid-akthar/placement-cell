const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true
    }
    ,date: {
        type: Date,
        required: true
    },students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    }]
})


const Company = mongoose.model('Company', companySchema);

module.exports = Company;