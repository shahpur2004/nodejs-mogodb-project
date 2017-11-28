var express = require('express');
var router = express.Router();
// making variable and requiring the controllerDatabase
var ControllerDatabase = require('../controllers/ControllerDatabase');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('this is the project mongo');
});
// routing the post method
router.post('/storeData', ControllerDatabase.storeData);


module.exports = router;
