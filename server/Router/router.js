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
  const order_id = req.query.order_id; // รับค่า order_id จาก URL

  if (!hn) {
    return res.status(400).send("กรุณาระบุ HN ของคนไข้");
  }

  const query = "SELECT * FROM patient WHERE hn = ?";
  db.query(query, [hn], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database Error");
    }

    if (results.length === 0) {
      return res.status(404).send("ไม่พบข้อมูลคนไข้");
    }

    // ส่งทั้งข้อมูลคนไข้ (patient) และ order_id ไปที่ EJS
    res.render('patient_info', { 
      patient: results[0], 
      order_id: order_id 
    });
  });
});

router.get('/oral_exam', (req, res) => {
  const hn = req.query.hn;
  const order_id = req.query.order_id;

  // ดึงข้อมูลคนไข้มาแสดงหัวกระดาษด้วย (ถ้าต้องการ)
  const query = "SELECT * FROM patient WHERE hn = ?";
  db.query(query, [hn], (err, results) => {
    if (err) return res.status(500).send("Database Error");

    res.render('oral_exam', { 
      patient: results[0] || {}, 
      order_id: order_id 
    });
  });
});

router.get('/diagnosis', (req, res) => {
    const hn = req.query.hn;
    const order_id = req.query.order_id;

    // ดึงข้อมูลคนไข้เพื่อเอามาแสดงชื่อที่หัวกระดาษ
    const query = "SELECT * FROM patient WHERE hn = ?";
    db.query(query, [hn], (err, results) => {
        if (err) return res.status(500).send("Database Error");
        
        // ส่งทั้งข้อมูล patient และ order_id ไปที่หน้า ejs
        res.render('diagnosis', { 
            patient: results[0] || {}, 
            order_id: order_id 
        });
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

router.get('/staff_manage', (req, res) => {
  const query = "SELECT * FROM staff";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database Error");
    }
    // ส่งข้อมูล staffs ที่ได้จาก database ไปยังไฟล์ ejs
    res.render('staff_manage', { staffs: results });
  });
});

router.use(express.urlencoded({ extended: true }));

router.post('/staff_add', (req, res) => {
  const { staff_id, id_card, title, name, lastname, department, bd, phone, email, username, password } = req.body;

    // 1. บันทึกลงตาราง staff
    const sqlStaff = "INSERT INTO staff (staff_id, id_card, title, name, lastname, department, bd, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sqlStaff, [staff_id, id_card, title, name, lastname, department, bd, phone, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("เกิดข้อผิดพลาดในการบันทึกข้อมูลบุคลากร");
        }

        // 2. บันทึกลงตาราง user_account สำหรับใช้ Login
        const sqlUser = "INSERT INTO user_account (staff_id, username, password_hash, role) VALUES (?, ?, ?, ?)";
        const role = (department === 'dentist') ? 'admin' : 'staff'; // กำหนด role ตามตำแหน่ง

        db.query(sqlUser, [staff_id, username, password, role], (err2, result2) => {
            if (err2) {
                console.error(err2);
                return res.status(500).send("เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้");
            }
            // บันทึกสำเร็จ กลับไปหน้าจัดการ
            res.send("<script>alert('บันทึกข้อมูลสำเร็จ'); window.location.href='/staff_manage';</script>");
        });
    });
});

router.get('/staff_edit', (req, res) => {
    const staffId = req.query.id;
    const query = "SELECT * FROM staff WHERE staff_id = ?";
    db.query(query, [staffId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send("ไม่พบข้อมูลบุคลากร");
        }
        res.render('staff_edit', { staff: results[0] });
    });
});

// 2. Route สำหรับรับข้อมูลที่แก้ไขแล้วบันทึกลง Database
router.post('/staff_edit', (req, res) => {
    const { staff_id, title, name, lastname, id_card, bd, phone, email } = req.body;
    const sql = `UPDATE staff SET title=?, name=?, lastname=?, id_card=?, bd=?, phone=?, email=? WHERE staff_id=?`;
    
    db.query(sql, [title, name, lastname, id_card, bd, phone, email, staff_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
        }
        res.send("<script>alert('แก้ไขข้อมูลสำเร็จ'); window.location.href='/staff_manage';</script>");
    });
});

router.delete('/api/staff_delete/:id', (req, res) => {
    const staffId = req.params.id;
    const sql = "DELETE FROM staff WHERE staff_id = ?";

    db.query(sql, [staffId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการลบข้อมูล" });
        }
        
        if (result.affectedRows > 0) {
            res.json({ success: true, message: "ลบข้อมูลสำเร็จ" });
        } else {
            res.status(404).json({ success: false, message: "ไม่พบข้อมูลพนักงาน" });
        }
    });
});

router.get('/create-order', (req, res) => {
    const hn = req.query.hn;
    const sql = "INSERT INTO order_request (hn, order_datetime) VALUES (?, NOW())";
    
    db.query(sql, [hn], (err, result) => {
        if (err) return res.status(500).send(err);
        const newOrderId = result.insertId; // ดึง order_id ที่สร้างใหม่
        res.redirect(`/patient_info?hn=${hn}&order_id=${newOrderId}`);
    });
});

router.get('/about', (req, res) => {res.render('about')});
router.get('/appointment', (req, res) => {res.render('appointment')});
router.get('/contact', (req, res) => {res.render('contact')});
router.get('/services', (req, res) => {res.render('services')});
router.get('/patient_info_h', (req, res) => {res.render('patient_info_h')});
router.get('/staff_login', (req, res) => {res.render('staff_login')});
router.get('/diagnosis_h', (req, res) => {res.render('diagnosis_h')});
router.get('/history', (req, res) => {res.render('history')});
router.get('/new_appointment', (req, res) => {res.render('new_appointment')});
router.get('/oral_exam_h', (req, res) => {res.render('oral_exam_h')});
router.get('/staff_add', (req, res) => {res.render('staff_add')});
router.get('/staff_edit', (req, res) => {res.render('staff_edit')});
router.get('/staff_info', (req, res) => {res.render('staff_info')});
router.get('/staff_list', (req, res) => {res.render('staff_list')});
router.get('/staff_manage', (req, res) => {res.render('staff_manage')});


module.exports = router;
