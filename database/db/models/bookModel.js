const mongoose = require('mongoose');
const { Types } = mongoose.Schema

const BookSchema = new mongoose.Schema({
    author: {
        type: Types.ObjectId,
        required: true,
        ref: "Author"
    },
    publisher: {
        type: Types.ObjectId,
        required: true,
        ref: "Publisher"
    },
    name: {
        type: String,
        required: true
    },
    numPages: {
        type: Types.Number,
        required: true,
        default: 50
    },
    amount: {
        type: Types.Number,
        required: true,
        default: 1
    },
    price: {
        type: Types.Number,
        required: true,
        default: 50
    }
})

const BookModel = mongoose.model("Book", BookSchema);
module.exports = BookModel;

