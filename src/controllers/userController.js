const { UserRepository } = require('../../database');
const { StatusCodes } = require('http-status-codes');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await UserRepository.login(email, password);
        if (result === null) return res.status(StatusCodes.NOT_FOUND).send("User Not found");
        if (result === false) return res.status(StatusCodes.CONFLICT).send("password not equal, check other password");
        const { token, user } = result;
        res.setHeader("authorization", token);
        res.status(StatusCodes.OK).send(`User ${user.fullName} logged in successfully `);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Error:  ${error.message}`);
    }
}


const signup = async (req, res) => {
    try {
        const result = await UserRepository.signup(req.body);
        if (!result) return res.status(StatusCodes.CONFLICT).send("Has same email, please change mail");
        const { user, token } = result;
        res.setHeader("authorization", token);
        res.status(StatusCodes.CREATED).send(`User ${user.fullName} signed up successfully `);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Error:  ${error.message}`);
    }
}


module.exports = {
    login, signup
}
