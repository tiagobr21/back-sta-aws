const express = require('express');
var cors =require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const coroinhaRoute = require('./routes/escala_coroinha');
const ministroRoute = require('./routes/escala_ministro')
const app = express();
const path = require("path")


app.get("/",(req,res)=>{
    return res.status(200).json("WELCOME");
})

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/escala_coroinha',coroinhaRoute);
app.use('/escala_ministro',ministroRoute);
app.use('/files',express.static(path.resolve(__dirname,".","tmp","uploads")))


module.exports = app;