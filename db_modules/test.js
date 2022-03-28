
const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    name: String,
    str: String
});

module.exports = mongoose.model('Test', TestSchema);