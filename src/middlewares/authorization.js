const { StatusCodes } = require('http-status-codes')



const authorization = (req, res, next) => {
    const { isAdmin } = req.user;
    if (!isAdmin) return res.status(StatusCodes.FORBIDDEN).send("Only admin permitted");
    next();
}

module.exports = authorization;