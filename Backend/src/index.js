const express = require('express');
var cors = require('cors');
const app = express();
const connection = require('../db/connection');
const userRoute = require('../routes/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user',userRoute);

module.exports = app;