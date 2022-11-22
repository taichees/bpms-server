
const DBConnection = require('../../connection/DBConnection')
const DBName = 'setting'
const con = DBConnection(DBName);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const column = new Schema({
    column_name: String,
    type: String,
    ref: String
})
const schema_setting = new Schema({
    schema_name: String,
    columns: [column]
});

module.exports = con.model('schema_setting', schema_setting);