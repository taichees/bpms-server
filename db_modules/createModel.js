
const DBConnection = require('../connection/DBConnection')
const DBName = 'test'
const con = DBConnection(DBName);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    get: function (data) {
        for (let key in con.models) {
            const datakey = data.schema_name + data._id;
            if (datakey === key) {
                return con.models[key];
            }
        }
        return this.create(data)
    },
    delete: function (data) {
        delete con.models[data.schema_name + data._id]
    },
    create: function (data) {
        let schema = {};
        const columns = data.columns;
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            let param = column.ref == "" ? column.type : {
                type: column.type,
                ref: column.ref
            }
            schema[column.column_name] = param
        }
        let Scheme = new Schema(schema);
        return con.model(data.schema_name + data._id, Scheme);
    }
}