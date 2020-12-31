const mongoose = require('mongoose');


const dbConnection = async () => {
    const DB_NAME = process.env.DB_NAME;
    try {
        await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
        console.log("DB CONNECTED");
    } catch (ex) {
        console.error("Can't Connect DB", ex);
    }
}

dbConnection();