const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || '5000'
const bodyParser = require('body-parser');

app.use(cors())
// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const schema_setting = require('./db_modules/setting/schema_setting');
const createModel = require('./db_modules/createModel');
// 登録
app.post('/schema_setting', async (req, res) => {
  let data = req.body;
  const schema_setting_data = new schema_setting(data);
  const saved_schema_setting_data = await schema_setting_data.save();
  res.json(saved_schema_setting_data);
})

// 取得
app.get('/schema_setting', async (req, res) => {
  const schema_setting_data = await schema_setting.find({});
  res.json(schema_setting_data);
})

app.get('/schema_setting/:schema_name', async (req, res) => {
  const schema_setting_data = await schema_setting.find({
    schema_name: req.params.schema_name
  });
  res.json(schema_setting_data);
})

// 更新
app.put('/schema_setting/:id', async (req, res) => {
  const schema_setting_data = await schema_setting.findByIdAndUpdate(req.params.id, req.body);
  // 変更前の情報が返る
  createModel.delete(schema_setting_data);
  res.json(schema_setting_data);
})

// 削除
app.delete('/schema_setting/:id', async (req, res) => {
  const schema_setting_data = await schema_setting.findByIdAndDelete(req.params.id);
  // 変更前の情報が返る
  createModel.delete(schema_setting_data);
  res.json(schema_setting_data);
})

// モデル取得
const getModel = async function (schema_name) {
  let data = await schema_setting.findOne({ schema_name: schema_name })
  return createModel.get(data);
}

// 登録
app.post('/schema/:schema_name', async (req, res) => {
  let model = await getModel(req.params.schema_name)
  const model_data = new model(req.body);
  const saved_model_data = await model_data.save();
  model.remove({});
  res.json(saved_model_data);
})

// 取得
app.get('/schema/:schema_name', async (req, res) => {
  let model = await getModel(req.params.schema_name)
  const model_data = await model.find({});
  model.remove({});
  res.json(model_data);
})

// 更新
app.put('/schema/:schema_name/:id', async (req, res) => {
  let model = await getModel(req.params.schema_name)
  // 変更前の情報が返る
  const model_data = await model.findByIdAndUpdate(req.params.id, req.body);
  model.remove({});
  res.json(model_data);
})

// 削除
app.delete('/schema/:schema_name/:id', async (req, res) => {
  let model = await getModel(req.params.schema_name)
  // 変更前の情報が返る
  const model_data = await model.findByIdAndDelete(req.params.id);
  model.remove({});
  res.json(model_data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})