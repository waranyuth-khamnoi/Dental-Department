const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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
    if (!req.session.user) {
        return res.redirect('/staff_login');
    }

    const query = "SELECT * FROM patient";
    db.query(query, (err, results) => {
        res.render('registration', { 
            patients: results, 
            user: req.session.user
        });
    });
});

router.post('/create-order', (req, res) => {
    const { hn, staff_id } = req.body;
    const query = "INSERT INTO order_request (hn, staff_id, order_datetime) VALUES (?, ?, NOW())";

    db.query(query, [hn, staff_id], (err, result) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ 
                success: false, 
                message: "DB Error: " + err.message 
            });
        }
        res.json({ success: true, order_id: result.insertId });
    });
});

router.delete('/delete-order/:order_id', (req, res) => {
    const orderId = req.params.order_id;

    db.query("DELETE FROM diagnosis WHERE order_id = ?", [orderId], () => {
        db.query("DELETE FROM oral_exam WHERE order_id = ?", [orderId], () => {
            db.query("DELETE FROM order_request WHERE order_id = ?", [orderId], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false });
                }
                res.json({ success: true });
            });
        });
    });
});

router.get('/patient_info', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/staff_login');
    }

    const order_id = req.query.order_id;

    const query = `
        SELECT * FROM patient 
        JOIN order_request ON patient.hn = order_request.hn
        WHERE order_request.order_id = ?
    `;

    db.query(query, [order_id], (err, results) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).send("Database Error: " + err.message);
        }

        res.render('patient_info', { 
            patient: results[0] || {}, 
            order_id: order_id,
            user: req.session.user 
        });
    });
});
router.get('/oral_exam', (req, res) => {
  const hn = req.query.hn;
  const order_id = req.query.order_id;

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

    const query = "SELECT * FROM patient WHERE hn = ?";
    db.query(query, [hn], (err, results) => {
        if (err) return res.status(500).send("Database Error");

        res.render('diagnosis', { 
            patient: results[0] || {}, 
            order_id: order_id 
        });
    });
});

router.post('/oral_exam', (req, res) => {
    const d = req.body;

    const sql = `INSERT INTO report 
        (order_id, t_decay, t_worn, t_broken, t_miss, t_fill, t_wisdom, t_misali, t_normal, t_unfill_cavities, 
        normal_occ, deep_bite, overlap, inflamed, t_loose, bleed, plaque, plaque_above, plaque_under, 
        jawpian, clicking, limit_open) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        d.order_id,
        d.t_decay,
        d.t_worn,
        d.t_broken,
        d.t_miss,
        d.t_fill,
        d.t_wisdom,
        d.t_misali,
        d.t_normal,
        d.t_unfill_cavities,
        d.normal_occ,
        d.deep_bite,
        d.overlap,
        d.inflamed,
        d.t_loose,
        d.bleed,
        d.plaque,
        d.plaque_above,
        d.plaque_under,
        d.jawpian,
        d.clicking,
        d.limit_open
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("======== DATABASE ERROR ========");
            console.error(err);
            return res.status(500).json({ success: false, message: err.sqlMessage });
        }
        res.json({ success: true });
    });
});

router.use(express.json());
router.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = `
        SELECT s.staff_id, s.name, s.lastname, u.role 
        FROM user_account u
        JOIN staff s ON u.staff_id = s.staff_id
        WHERE u.username = ? AND u.password_hash = ?
    `;

    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("SQL Error:", err.message);
            return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดที่ระบบฐานข้อมูล" });
        }

        if (results.length > 0) {
            req.session.user = {
                staff_id: results[0].staff_id,
                name: results[0].name + " " + results[0].lastname,
                role: results[0].role
            };

            res.json({ 
                success: true, 
                role: results[0].role 
            });
        } else {
            res.json({ success: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
        }
    });
});

router.get('/staff_info', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/staff_login');
    }

    const staffId = req.query.id;
    const query = "SELECT * FROM staff WHERE staff_id = ?";
    
    db.query(query, [staffId], (err, results) => {
        if (err) return res.status(500).send("Database Error");
        
        res.render('staff_info', { 
            staff: results[0] || {}, 
            user: req.session.user 
        });
    });
});

router.get('/staff_list', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/staff_login');
    }

    const query = "SELECT * FROM staff";
    db.query(query, (err, results) => {
        if (err) return res.status(500).send("Database Error");
        
        res.render('staff_list', { 
            staffs: results, 
            user: req.session.user
        });
    });
});

router.get('/staff_manage', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/staff_login');
    }

    const query = `
        SELECT staff.*, user_account.role 
        FROM staff 
        JOIN user_account ON staff.staff_id = user_account.staff_id 
        WHERE user_account.role != '0'
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database Error");
        }
        
        res.render('staff_manage', { 
            staffs: results, 
            user: req.session.user 
        });
    });
});

router.use(express.urlencoded({ extended: true }));

router.post('/staff_add', (req, res) => {
    const { staff_id, id_card, title, name, lastname, department, bd, phone, email, username, password } = req.body;

    const sqlStaff = "INSERT INTO staff (staff_id, id_card, title, name, lastname, department, bd, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sqlStaff, [staff_id, id_card, title, name, lastname, department, bd, phone, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("เกิดข้อผิดพลาดในการบันทึกข้อมูลบุคลากร");
        }

        const sqlUser = "INSERT INTO user_account (staff_id, username, password_hash, role) VALUES (?, ?, ?, ?)";
        const role = (department === 'dentist') ? '0' : '1';

        db.query(sqlUser, [staff_id, username, password, role], (err2, result2) => {
            if (err2) {
                console.error(err2);
                return res.status(500).send("เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้");
            }
            res.send("<script>alert('บันทึกข้อมูลสำเร็จ'); window.location.href='/staff_manage';</script>");
        });
    });
});
router.get('/staff_add', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/staff_login');
    }
    
    res.render('staff_add', { 
        user: req.session.user 
    });
});

router.get('/staff_edit', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/staff_login');
    }

    const staffId = req.query.id;
    const query = "SELECT * FROM staff WHERE staff_id = ?";
    db.query(query, [staffId], (err, results) => {
        if (err) return res.status(500).send("Database Error");
        
        res.render('staff_edit', { 
            staff: results[0] || {}, 
            user: req.session.user
        });
    });
});

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
        const newOrderId = result.insertId;
        res.redirect(`/patient_info?hn=${hn}&order_id=${newOrderId}`);
    });
});

router.post('/diagnosis', (req, res) => {
    const d = req.body;

    const sqlInsertDiag = `INSERT INTO diagnosis 
        (order_id, prevent, re_dentistry, oral_sur, root_treatment, endodontics, gp_disease) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const paramsDiag = [
        d.order_id, 
        d.prevent, 
        d.re_dentistry, 
        d.oral_sur, 
        d.root_treatment, 
        d.endodontics, 
        d.gp_disease
    ];

    db.query(sqlInsertDiag, paramsDiag, (err) => {
        if (err) return res.status(500).json({ success: false, message: "บันทึก Diagnosis ล้มเหลว" });

        const sqlMoveToHistory = `
            INSERT INTO p_h (order_id, hn, title, patient_name, patient_lastname, id_card_p, birthdate, phone, treatment, c_diseases, drug_aller)
            SELECT o.order_id, p.hn, p.title, p.patient_name, p.patient_lastname, p.id_card_p, p.birthdate, p.phone, p.treatment, p.c_diseases, p.drug_aller
            FROM patient p
            JOIN order_request o ON p.hn = o.hn
            WHERE o.order_id = ?`;

        db.query(sqlMoveToHistory, [d.order_id], (err) => {
            if (err) {
                console.error("Move to p_h Error:", err.message);
                return res.status(500).json({ success: false, message: "ข้อมูลไม่บันทึกใน p_h: " + err.message });
            }

            db.query("SELECT hn FROM order_request WHERE order_id = ?", [d.order_id], (err, rows) => {
                if (err || rows.length === 0) return res.json({ success: true });
                const hnToDelete = rows[0].hn;

                db.query("SET FOREIGN_KEY_CHECKS = 0", (err) => {
                    db.query("DELETE FROM patient WHERE hn = ?", [hnToDelete], (err) => {
                        db.query("SET FOREIGN_KEY_CHECKS = 1", () => {
                            if (err) {
                                console.error("Delete Patient Error:", err.message);
                                return res.json({ success: true, warning: "บันทึก p_h แล้วแต่ลบคนไข้ไม่ได้" });
                            }
                            console.log("บันทึก p_h และลบคนไข้สำเร็จ");
                            res.json({ success: true });
                        });
                    });
                });
            });
        });
    });
});

router.get('/history', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/staff_login');
    }

    const query = `
        SELECT 
            p.order_id, 
            o.order_datetime, 
            p.patient_name, 
            p.patient_lastname, 
            s.name AS staff_name, 
            s.lastname AS staff_lastname,
            p.hn
        FROM p_h p
        LEFT JOIN order_request o ON p.order_id = o.order_id
        LEFT JOIN staff s ON o.staff_id = s.staff_id
        ORDER BY o.order_datetime DESC`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("History Query Error:", err.message);
            return res.status(500).send("Database Error");
        }
        
        res.render('history', { 
            historyData: results,
            user: req.session.user 
        });
    });
});

router.get('/patient_info_h', (req, res) => {
    const order_id = req.query.order_id;
    if (!order_id) {
        return res.status(400).send("ไม่พบรหัสใบสั่งการรักษา");
    }
    const query = "SELECT * FROM p_h WHERE order_id = ?";
    db.query(query, [order_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database Error");
        }
        res.render('patient_info_h', { 
            patient: results[0] || {}, 
            order_id: order_id,
            user: req.session.user
        });
    });
});

router.get('/oral_exam_h', (req, res) => {
    const order_id = req.query.order_id;
    if (!order_id) {
        return res.status(400).send("ไม่พบรหัสใบสั่งการรักษา");
    }

    const query = "SELECT * FROM report WHERE order_id = ?"; 

    db.query(query, [order_id], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).send("Database Error: " + err.message);
        }
        
        res.render('oral_exam_h', { 
            reportData: results[0] || {}, 
            order_id: order_id,
            user: req.session.user 
        });
    });
});

router.get('/diagnosis_h', (req, res) => {
    const order_id = req.query.order_id;
    if (!order_id) {
        return res.status(400).send("ไม่พบรหัสใบสั่งการรักษา");
    }

    const sql = "SELECT * FROM diagnosis WHERE order_id = ?"; 
    
    db.query(sql, [order_id], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).send("Database Error");
        }
        res.render('diagnosis_h', { 
            diagData: results[0] || {}, 
            order_id: order_id,
            user: req.session.user 
        });
    });
});

router.get('/api/diagnosis-data/:order_id', (req, res) => {
    const order_id = req.params.order_id;

    const sql = "SELECT * FROM diagnosis WHERE order_id = ?"; 
    
    db.query(sql, [order_id], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("Data from DB:", results[0]);
        res.json(results[0] || {});
    });
});

router.get('/about', (req, res) => {res.render('about')});
router.get('/appointment', (req, res) => {res.render('appointment')});
router.get('/contact', (req, res) => {res.render('contact')});
router.get('/services', (req, res) => {res.render('services')});
router.get('/staff_login', (req, res) => {res.render('staff_login')});
router.get('/new_appointment', (req, res) => {res.render('new_appointment')});
router.get('/staff_add', (req, res) => {res.render('staff_add')});
router.get('/staff_edit', (req, res) => {res.render('staff_edit')});
router.get('/staff_info', (req, res) => {res.render('staff_info')});
router.get('/staff_list', (req, res) => {res.render('staff_list')});
router.get('/staff_manage', (req, res) => {res.render('staff_manage')});

module.exports = router;