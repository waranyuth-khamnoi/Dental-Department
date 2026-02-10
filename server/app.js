const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const session = require('express-session'); // 1. เพิ่มบรรทัดนี้
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

// 2. เพิ่มการตั้งค่า Session ตรงนี้ (ต้องอยู่ก่อน router)
app.use(session({
    secret: 'dental_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.json()); // เพิ่มเพื่อให้รับค่าจาก fetch แบบ JSON ได้
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../app')));

app.use('/', router);


app.listen(3000, () => console.log('Server is running on http://localhost:3000')); 
