require('express-async-errors');
const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
var multer = require('multer');
var upload = multer();
const path = require('path');
const error = require('../middleware/error');

const auth = require('../routes/auth.router');
const user = require('../routes/user.router');
const product = require('../routes/product.router');
const order = require('../routes/order.router');

module.exports = function(app){
    // app.use(bodyParser.urlencoded({
    //     extended:true,
    //     limit:'25mb',
    //     parameterLimit:50000
    // }));
    app.use(bodyParser.json({limit: '25mb'}));
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(express.static(path.join(__dirname, '/uploads'))) 
    app.use('/uploads',express.static( 'uploads'));
    app.use(cors());
    app.use('/auth',auth);
    app.use('/user',user);
    app.use('/product',product);
    app.use('/order',order);
    app.use(error);
}