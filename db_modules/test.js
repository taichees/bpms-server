
const DBConnection = require('../connection/DBConnection')
const DBName = 'test'
const con = DBConnection(DBName);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema_name = 'test'

const schema_setting = require('./setting/schema_setting');

module.exports = new Promise((resolve, reject) => {
    schema_setting.findOne({
        schema_name: schema_name
    }, (error, data) => {

        if (error) {
            reject(error)
        }

        let schema = {};
        const columns = data.columns;
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            schema[column.column_name] = column.type
        }
        let TestSchema = new Schema(schema);
        const testObj = con.model('Test', TestSchema);
        resolve(testObj);
    })
})