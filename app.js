const express = require('express');
const bodyParser = require('body-parser');
const expHbs = require('express-handlebars');
const mysql = require('mysql');
const { config } = require('dotenv');

const app = express();

port = process.env.PORT || 5000;