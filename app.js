require('dotenv').config();
const express = require('express');
const app = express();
const mongoURL = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;
const connectDB = require("./database/mongo")
const mongoose = require('mongoose')
const routes = require('./route/index')
const cookieParser = require('cookie-parser')
const userSetterMiddleware = require('./middleware/setUser')



connectDB();
app.use(cookieParser())
app.use(express.json());
app.use(userSetterMiddleware);

app.use('/', routes);



// set user as a req.user

const PORT = process.env.PORT || 3000;


mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
})

