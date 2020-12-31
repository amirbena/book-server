
require('./dbConnection');

const AuthorModel = require('./models/authorModel');
const BookModel = require('./models/bookModel');
const PublisherModel = require('./models/publisherModel');
const PurchaseModel = require('./models/purchaseModel');
const UserModel = require('./models/userModel');


module.exports = {
    AuthorModel,
    BookModel,
    PublisherModel,
    PurchaseModel,
    UserModel
}