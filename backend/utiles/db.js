const mongoose = require('mongoose');
require('dotenv').config();

module.exports.dbConnect = async () => {
    try {
        mongoose.connect(process.env.DB_URL);
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log("database connect");
        });
    } catch (error) {
        console.log(error.message);
    }
}