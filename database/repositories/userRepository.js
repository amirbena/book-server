const jwt = require('jsonwebtoken');
const { UserModel } = require('../db');
const bcrypt = require('bcrypt');

const createUser = async ({ fullName, email, password, isAdmin = false }) => {
    const foundUser = await UserModel.findOne({ email }).exec();
    if (foundUser) return null;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await new UserModel({
        fullName,
        email,
        password: hashedPassword,
        isAdmin
    }).save();

    return user;
}
const genToken = async (id, email, isAdmin = false) => {
    const tokenPayload = { id, email, isAdmin };
    const tokenKey = process.env.TOKEN_KEY; // For execrise it's one key, I know that I need to replace in sometimes key
    const token = await jwt.sign(tokenPayload, tokenKey)
    return token;
}
const signup = async ({ fullName, email, password }) => {
    const user = await createUser({ fullName, email, password });
    if (!user) return user;
    const token = await genToken(user._id, email);
    return { token,user };
}
const login = async (email, password) => {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) return null;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) return false;
    const token = await genToken(user._id, email, user.isAdmin)
    return { token,user };

}





module.exports = {
    signup,
    login,
    createUser
}



