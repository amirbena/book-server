const { AuthorModel, PublisherModel, BookModel } = require('../db')



const checkPublish = async (publisherName) => {
    let publisherId = await PublisherModel.findOne({ publisherName }).exec();
    if (!publisherId) {
        publisherId = await PublisherModel.create({ publisherName });
        publisherId = publisherId._id;
    }
    else publisherId = publisherId._id;

    return publisherId;

}

const checkAuthor = async authorName => {
    let authorId = await AuthorModel.findOne({ authorName }).exec();
    if (!authorId) {
        authorId = await AuthorModel.create({ authorName });
        authorId = authorId._id;
    }
    else authorId = authorId._id;
    return authorId;

}


const getAllBooks = async () => {
    const books = await BookModel.find({}).populate("author", "authorName").populate("publisher", "publisherName").exec();
    return books;
}

const getBookById = async id => {
    const book = await BookModel.findById(id).populate("author", "authorName").populate("publisher", "publisherName").exec();
    return book;
}


const createBook = async ({ authorName, publisherName, name, numPages, amount, price }) => {
    const author = await checkAuthor(authorName);
    console.log("publisher", publisherName)
    const publisher = await checkPublish(publisherName);
    let newBook = new BookModel({
        name,
        numPages,
        publisher,
        author,
        price,
        amount
    })
    await newBook.save();
    newBook = await newBook.populate("publisher").execPopulate();
    return await newBook.populate("author").execPopulate();

}

const updateBook = async (id, book) => {
    if (book.publisherName) {
        const publisher = await checkPublish(book.publisherName);
        delete book["publisherName"];
        book = { ...book, publisher };
    }
    if (book.authorName) {
        const author = await checkAuthor(book.authorName);
        delete book["authorName"];
        book = { ...book, author };
    }
    let updatedBook = await BookModel.findByIdAndUpdate(id, book).exec();
    updatedBook = await updatedBook.populate("publisher").execPopulate();
    return await updatedBook.populate("author").execPopulate();
}



const deleteBook = async id => {
    await BookModel.findByIdAndRemove(id);
}


module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    getBookById
}





