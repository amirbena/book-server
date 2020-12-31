const { PurchaseModel, UserModel, BookModel } = require('../db');
const async = require('async');


const checkIfBookIsAvailable = async booksList => {
    const bookNamesNotAvailable = [];
    const booksNotFound = [];
    await async.each(booksList, async book => {
        const { book: bookId, amount } = book;
        const foundBook = await BookModel.findById(bookId).exec();
        if (!foundBook) { booksNotFound.push(bookId); return; }
        const { amount: currentAmountOfBook, name: bookName } = foundBook;
        if (currentAmountOfBook < amount) {
            bookNamesNotAvailable.push({ bookId, bookName });
            return
        }
        await BookModel.findByIdAndUpdate(bookId, { amount: currentAmountOfBook - amount });
    })
    return { booksNotFound, bookNamesNotAvailable };
}



const createPurchase = async (user, booksList, totalPrice) => {
    const foundUser = await UserModel.findById(user).exec();
    if (!foundUser) return null;

    const { bookNamesNotAvailable, booksNotFound } = await checkIfBookIsAvailable([...booksList]);
    let booksDetails = booksList.filter(book => !booksNotFound.includes(book.book));
    const bookNamesNotAvailableIds = bookNamesNotAvailable.map(book => book.book);
    booksDetails = booksDetails.filter(book => !bookNamesNotAvailableIds.includes(book.book));

    let newPurchase = new PurchaseModel({
        user,
        booksDetails,
        totalPrice

    })
    newPurchase = await newPurchase.save();
    newPurchase = await newPurchase.populate('booksDetails.book').execPopulate();
    newPurchase = await newPurchase.populate('booksDetails.book.publisher').execPopulate();
    newPurchase = await newPurchase.populate('booksDetails.book.author').execPopulate();
    newPurchase = await newPurchase.populate('user').execPopulate();
    return { newPurchase, notFound: booksNotFound.length, bookNamesNotAvailable: bookNamesNotAvailableIds.map(book => book.bookName) };


}

const allUsersPurchases = async () => {
    const allPurchases = await PurchaseModel.find({}).populate({
        path: 'booksDetails.book',
        populate: [{
            path: 'author',
            model: 'Author'
        }, {
            path: 'publisher',
            model: 'Publisher'
        }]
    }).populate('user').exec();
    return allPurchases
}


const userPurchases = async userId => {
    const allPurchases = await PurchaseModel.find({ user: userId }).populate({
        path: 'booksDetails.book',
        populate: [{
            path: 'author',
            model: 'Author'
        }, {
            path: 'publisher',
            model: 'Publisher'
        }]
    }).populate('user').exec();
    return allPurchases;
}

module.exports = {
    createPurchase,
    userPurchases,
    allUsersPurchases
}