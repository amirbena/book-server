const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const allRoutes = require('./routes');

app.use(cors());
app.use(bodyParser.json());


app.use('/users', allRoutes.UserRouter);
app.use('/books', allRoutes.BookRouter);
app.use('/purchases', allRoutes.PurchaseRouter);


const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Server is working on ${PORT} port`);
})


module.exports = server;