const mongoose = require('mongoose');

const { Types } = mongoose.Schema;

const PurchaseSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    booksDetails: [{
        book: {
            type: Types.ObjectId,
            required: true,
            ref: "Book"
        },
        amount: {
            type: Types.Number,
            required: true,
            default: 1
        }
    }],
    datePurchased: {
        type: Types.Date,
        required: true,
        default: new Date()
    },
    totalPrice:{
        type: Types.Number,
        required: true
    }
});

const PurchaseModel = mongoose.model("Purchase", PurchaseSchema);
module.exports = PurchaseModel;