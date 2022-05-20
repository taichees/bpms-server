var express = require('express');
var router = express.Router();

//init display
router.get('/', (req, res) => {
    res.send('Here is test page')
})

router.get('/', async (req, res) => {
    const test_data = await test.find({});
    res.json(test_data);
})

router.post('/', async (req, res) => {
    const test_data = new test({
        name: req.body.name,
        str: req.body.str
    });

    const saved_test_data = await test_data.save();
    res.json(saved_test_data);

})

module.exports = router;