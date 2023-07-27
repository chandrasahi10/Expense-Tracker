const express = require('express');
const bodyParser = require('body-parser');
const expHbs = require('express-handlebars');
const mysql = require('mysql');

require('dotenv').config();

const app = express();

port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('hbs', expHbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

pool.getConnection((err, connection)=>{
    if(err){
        throw err;
    };
    console.log('Connected as ID'+ connection.threadId);
});

const routes = require("./server/routes/user");
app.use('/',routes);

app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Listening to port ${port}`);
    }
});