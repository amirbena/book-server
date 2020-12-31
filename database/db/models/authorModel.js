const mongoose = require('mongoose');


const AuthorSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true,
    }
})


const AuthorModel = mongoose.model("Author", AuthorSchema);
module.exports = AuthorModel;