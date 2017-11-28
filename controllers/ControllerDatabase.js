var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://shahpur2004:Allahpak1@ds117316.mlab.com:17316/heroku_7ks7kqkx';

//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencode


module.exports.storeData = function (req, res, next) {


    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;

        var info = JSON.parse(req.body.info);
        var card = JSON.parse(req.body.card);
        var cart = JSON.parse(req.body.cart);


        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);

        //creating a customer collection
        var CUSTOMERS = db.collection('CUSTOMERS');

        var customerdata = {
            _id: customerID,
            FIRSTNAME: info['firstname'],// indexes of the collection
            LASTNAME: info['lastname'],
            STREET: info['address'] + ' ' + info['address2'],
            CITY: info['city'],
            STATE: info['state'],
            ZIP: info['zipcode'],
            PHONE: info['telephone'],
            FIRSTNAMEB: info['firstnameB'],
            LASTNAMEB: info['lastnameB'],
            STREETB: info['addressB'] + ' ' + info['address2B'],
            CITYB: info['cityB'],
            STATEB: info['stateB'],
            ZIPB: info['zipcodeB'],
            PHONEB: info['telephoneB']
        };
        // checking for error
        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;

        });
        //customer collection operation

        //res.send(JSON.stringify(req.body.card));


        //Creating billing collection
        var BILLING = db.collection('BILLING');

        var bilingdata = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            CREDITCARDTYPE: card['type'],
            CREDITCARDNUM: card['number'],
            CREDITCARDEXP: card['date'],
            NAMEONCREDITCARD: card['name']
        };


    /*    var bilingdata = {
            CUSTOMER_ID: 54214,
            CREDITCARDTYPE: 1,
            CREDITCARDNUM: 2,
            CREDITCARDEXP: 3,
            NAMEONCREDITCARD: 4
        };
*/

        BILLING.insertOne(bilingdata, function (err, result) {
            if (err) throw err;

        });
        //Bilining collection operation


        //Creating Shipping collection
        var SHIPPING = db.collection('SHIPPING');

        var shipingdata = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: info['address'] + ' ' + info['address2'],
            SHIPPING_CITY: info['city'],
            SHIPPING_STATE: info['state'],
            SHIPPING_ZIP: info['zipcode']
        };

        SHIPPING.insertOne(shipingdata, function (err, result) {
            if (err) throw err;

        });
        //Shipping collection operation



        //Creating Order collection operation
        var ORDERS = db.collection('ORDERS');

        var orderdata = {
            CUSTOMER_ID: customerID,
            BILLING_ID: billingID,
            SHIPPING_ID: shippingID,
            DATE: (new Date()).toDateString(),
            PRODUCT_VECTOR: cart,
            ORDER_TOTAL: Object.keys(cart).length
        };

        ORDERS.insertOne(orderdata, function (err, result) {
            if (err) throw err;

        });
        //Order collection operation


        res.send('******************Thank You, order successful  *********************');


        //close connection when your app is terminating.
        db.close(function (err) {
            if (err) throw err;
        });
    });//end of connect


};
