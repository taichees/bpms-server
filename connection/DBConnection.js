
module.exports = function (DBName) {
    const DB = (process.env.DB_URL || 'mongodb://127.0.0.1/') + DBName;

    const mongoose = require('mongoose');

    const con = mongoose.createConnection(DB);
    con.on('error', console.error.bind(console, 'setting DB connection error:'));
    con.once('open', () => console.log('setting DB connection successful'));

    return con
};