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

router.get('/registration', (req, res) => {
  const query = "SELECT * FROM patient";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database Error");
    }
    res.render('registration', { patients: results });
  });
});

router.get('/patient_info', (req, res) => {
  const hn = req.query.hn;
  const query = "SELECT * FROM patient WHERE hn = ?";

  db.query(query, [hn], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database Error");
    }
    res.render('patient_info', { patient: results[0] || {} });
  });
});

router.use(express.json());
router.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM user_account WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database Error" });
    }
    if (results.length > 0) {
      const user = results[0];
      if (user.password_hash === password) {
        return res.json({ 
          success: true, 
          role: user.role,
          message: "Login successful" 
        });
      } else {
        return res.json({ success: false, message: "รหัสผ่านไม่ถูกต้อง" });
      }
    } else {
      return res.json({ success: false, message: "ไม่พบชื่อผู้ใช้งานนี้" });
    }
  });
});

router.get('/staff_list', (req, res) => {
  const query = "SELECT * FROM staff";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database Error");
    }
    res.render('staff_list', { staffs: results });
  });
});

router.get('/staff_info', (req, res) => {
    const staffId = req.query.id;
    const query = "SELECT * FROM staff WHERE staff_id = ?";
    db.query(query, [staffId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database Error");
        }
        res.render('staff_info', { staff: results[0] || {} });
    });
});

router.get('/about', (req, res) => {res.render('about')});
router.get('/appointment', (req, res) => {res.render('appointment')});
router.get('/contact', (req, res) => {res.render('contact')});
router.get('/services', (req, res) => {res.render('services')});
router.get('/patient_info', (req, res) => {res.render('patient_info')});
router.get('/patient_info_h', (req, res) => {res.render('patient_info_h')});
router.get('/staff_login', (req, res) => {res.render('staff_login')});
router.get('/registration', (req, res) => {res.render('registration')});
router.get('/diagnosis', (req, res) => {res.render('diagnosis')});
router.get('/diagnosis_h', (req, res) => {res.render('diagnosis_h')});
router.get('/history', (req, res) => {res.render('history')});
router.get('/new_appointment', (req, res) => {res.render('new_appointment')});
router.get('/oral_exam', (req, res) => {res.render('oral_exam')});
router.get('/oral_exam_h', (req, res) => {res.render('oral_exam_h')});
router.get('/staff_add', (req, res) => {res.render('staff_add')});
router.get('/staff_edit', (req, res) => {res.render('staff_edit')});
router.get('/staff_info', (req, res) => {res.render('staff_info')});
router.get('/staff_list', (req, res) => {res.render('staff_list')});
router.get('/staff_manage', (req, res) => {res.render('staff_manage')});


module.exports = router;
