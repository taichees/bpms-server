const express = require('express')
const app = express()
const port = 8080

//urlencodedとjsonは別々に初期化する
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//DBconnection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test_db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));

//for rooting
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
app.use('/', indexRouter);
app.use('/test', testRouter);

//listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;