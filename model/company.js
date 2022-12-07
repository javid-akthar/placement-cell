const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// company collection schema
const companySchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
        trim: true,
    }
    ,date: {
        type: String,
        required: true
    },students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    }]
})


const Company = mongoose.model('Company', companySchema);

module.exports = Company;