const { PurchaseRepository } = require('../../database');
const { StatusCodes } = require('http-status-codes');

const createPurchase = async (req, res) => {
    console.log(req.body);
    const { booksList, totalPrice } = req.body;
    const { id } = req.user;
    try {
        const result = await PurchaseRepository.createPurchase(id, booksList, totalPrice);
        if (!result) return res.status(StatusCodes.NOT_FOUND).send("User not found, please authenticate");  // Maybe Delete, never go this point if user autheticate
        const { bookNamesNotAvailable, notFound, newPurchase } = result;
        if (notFound === booksList.length) return res.status(StatusCodes.NOT_FOUND).send("no book found in delete mode");
        res.status(StatusCodes.CREATED).json({ bookNamesNotAvailable, newPurchase, message: "Purchase added to list" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Error:  ${error.message}`);
    }
}


const allUsersPurchases = async (req, res) => {
    try {
        const allPurchases = await PurchaseRepository.allUsersPurchases();
        res.status(StatusCodes.OK).json({ allPurchases });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Error:  ${error.message}`);
    }
}

const userPurchases = async (req, res) => {
    const { id } = req.user;
    try {
        const userPurchases = await PurchaseRepository.userPurchases(id);
        res.status(StatusCodes.OK).json({ userPurchases });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Error:  ${error.message}`);
    }
}


module.exports = {
    userPurchases,
    allUsersPurchases,
    createPurchase
}