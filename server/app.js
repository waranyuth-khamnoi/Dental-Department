const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const app = express();
const router = require('./Router/router');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'teeth' 
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../app')));

app.use('/', router);


app.listen(3000, () => console.log('Server is running on http://localhost:3000')); 
