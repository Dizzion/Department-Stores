const mongoose = require('mongoose')
// create and use Stores database
const connectionString = 'mongodb://localhost/Stores'

export const secret = "ShhItsSecretGuys"

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