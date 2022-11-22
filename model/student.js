const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    college:{
        type: String,
    },
    batch:{
        type: String,
    },
    status:{
        type: String,
    },
    dsaScore:{
        type: Number,
    },
    webDevelopmentScore:{
        type: Number,
    },
    reactScore:{
        type: Number,
    },
    interviews: [{
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Interview'
    }]
})


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;