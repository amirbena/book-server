const mongoose = require('mongoose');


const publisherSchema = new mongoose.Schema({
    publisherName: {
        type: String,
        required: true,
    }
})


const PublisherModel= mongoose.model("Publisher", publisherSchema);
module.exports = PublisherModel; 