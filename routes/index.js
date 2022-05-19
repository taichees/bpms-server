var express = require('express');
var router = express.Router();

//init display
router.get('/', (req, res) => {
    res.send('Here is index page')
})

module.exports = router;