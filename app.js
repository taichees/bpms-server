const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser');

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test_db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));


const test = require('./db_modules/test');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', async (req, res) => {
  const test_data = await test.find({});
  res.json(test_data);
})

app.post('/test', async (req, res) => {
  const test_data = new test({
    name: req.body.name,
    str: req.body.str
  });

  const saved_test_data = await test_data.save();
  res.json(saved_test_data);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})