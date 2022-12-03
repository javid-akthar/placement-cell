const mongoose = require('mongoose');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    college:{
        type: String,
        trim: true
    },
    batch:{
        type: String,
        trim: true
    },
    status:{
        type: String,
        enum: ["Placed", "Not Placed"],
    },
    dsaScore:{
        type: Number,
        min: 0,
        max: 100,
        trim: true
    },
    webDevelopmentScore:{
        type: Number,
        min: 0,
        max: 100,
        trim: true
    },
    reactScore:{
        type: Number,
        min: 0,
        max: 100,
        trim: true
    },
    interviews: [{
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Interview'
    }]
})


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;