const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
}
)

const User = mongoose.model('User', userSchema);

module.exports = User;