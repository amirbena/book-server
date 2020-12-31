const { BookRepository } = require('../../database');
const { StatusCodes } = require('http-status-codes');


const createBook = async (req, res) => {
    try {
        const createdBook = await BookRepository.createBook(req.body);
        res.status(StatusCodes.CREATED).json({ book: createdBook, message: "New Book added" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Error:  ${error.message}`);
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await BookRepository.getAllBooks();
        res.status(StatusCodes.OK).json({ books });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Error:  ${error.message}`);
    }
}


const updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await BookRepository.updateBook(id, req.body);
        if (!updatedBook) return res.status(StatusCodes.NOT_FOUND).send("Book not found");
        res.status(StatusCodes.OK).json({ updatedBook, message: "Book Updated Sucessfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Error:  ${error.message}`);
    }
}


const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await BookRepository.deleteBook(id);
        res.status(StatusCodes.OK).send("Book Deleted Sucessfully");
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Error:  ${error.message}`);
    }
}


module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
}