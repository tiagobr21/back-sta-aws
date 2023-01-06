const express = require('express');
var cors =require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const coroinhaRoute = require('./routes/escala_coroinha');
const ministroRoute = require('./routes/escala_ministro')
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/escala_coroinha',coroinhaRoute);
app.use('/escala_ministro',ministroRoute);


module.exports = app;