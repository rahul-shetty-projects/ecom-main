var https = require('https');
const express = require('express');
const app = express();

require('./config/config');
require('./startup/prod')(app);
require('./models/db');

require('./startup/routes') (app);

app.listen(process.env.PORT, err => {
    if(err){console.log(err);}
    console.log(`Server Started On Port : ${process.env.PORT}`);
})