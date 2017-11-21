var express = require('express');
var router = express.Router();
var ControllerDatabase = require('../controllers/ControllerDatabase');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('this is the project mongo');
});

router.post('/storeData', ControllerDatabase.storeData);


module.exports = router;
