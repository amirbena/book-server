const mongoose = require('mongoose');
const { Types } = mongoose.Schema

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Types.Boolean,
        required: true,
        default: false
    }
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel;