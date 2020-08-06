const mongoose = require('mongoose')
// create and use Stores database
const connectionString = 'mongodb://localhost/Stores'
const connectionString2 = 'mongodb+srv://Client_User:HnbXEil3V3loBbBM@deparmentstore1.xevrz.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// check connection to the database
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose is disconnected`);
});

mongoose.connection.on('error', (err) => {
    console.log(err, 'mongoose error');
});