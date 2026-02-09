const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const router = express.Router();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'teeth' 
});

router.get('/', (req, res) => {
  res.render('main');
});


router.get('/about', (req, res) => {res.render('about')});
router.get('/appointment', (req, res) => {res.render('appointment')});
router.get('/contact', (req, res) => {res.render('contact')});
router.get('/services', (req, res) => {res.render('services')});
router.get('/patient_info', (req, res) => {res.render('patient_info')});
router.get('/staff_login', (req, res) => {res.render('staff_login')});
router.get('/registration', (req, res) => {res.render('registration')});
router.get('/diagnosis', (req, res) => {res.render('diagnosis')});
router.get('/history', (req, res) => {res.render('history')});
router.get('/new_appointment', (req, res) => {res.render('new_appointment')});
router.get('/oral_exam', (req, res) => {res.render('oral_exam')});
router.get('/staff_add', (req, res) => {res.render('staff_add')});
router.get('/staff_edit', (req, res) => {res.render('staff_edit')});
router.get('/staff_info', (req, res) => {res.render('staff_info')});
router.get('/staff_list', (req, res) => {res.render('staff_list')});
router.get('/staff_manage', (req, res) => {res.render('staff_manage')});


module.exports = router;
