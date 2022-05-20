var express = require('express');
var router = express.Router();

//db
const test = require('../db_modules/test');

//http example.use bpms-server/restclient/test_~
//get example
router.get('/', (req, res) => {
    res.send('Here is test page')
})

//test/getTestData example
router.get('/getTestData', async (req, res) => {
    const test_data = await test.find({});
    res.json(test_data);
})

//POST example
router.post('/', async (req, res) => {
    const test_data = new test({
        name: req.body.name,
        str: req.body.str
    });

    const saved_test_data = await test_data.save();
    res.json(saved_test_data);

})

module.exports = router;