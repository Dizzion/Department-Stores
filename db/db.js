const mongoose = require('mongoose')
require('dotenv').config()
const connectionString = 'mongodb://localhost/Stores'
const connectionString2 = process.env.CONNECTIONDB

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// check connection to the database
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to the DB`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose is disconnected`);
});

mongoose.connection.on('error', (err) => {
    console.log(err, 'mongoose error');
});