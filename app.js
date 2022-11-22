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
const readdirSync = require('fs');
const baseName = require('./utils');

const fileList =readdirSync.readdirSync("./routes", { withFileTypes: true })
  .filter((dirent) => dirent.isFile())
  .map((dirent) => dirent.name)

for (const file of fileList) {
  console.log(baseName.baseName(file))
  // tslint:disable-next-line:no-var-requires
  app.use(`/${baseName.baseName(file)}`, require(`./routes/${baseName.baseName(file)}`))
}

//listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports = app;