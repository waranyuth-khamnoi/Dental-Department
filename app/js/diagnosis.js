document.addEventListener('DOMContentLoaded', () => {
    const diagnosisForm = document.getElementById('diagnosisForm');
    const logoutBtn = document.querySelector('.icon-logout');
    const urlParams = new URLSearchParams(window.location.search);
    const data = {
        order_id: urlParams.get('order_id'),
        hn: urlParams.get('hn'), // ดึง HN จาก URL มาส่งไปด้วย
        prevent: formData.get('p1') === 'Y' ? 'Y' : 'N',
    // ... ฟิลด์อื่นๆ
    };

    // 1. ระบบจัดการการเลือก Radio Buttons
    // เพิ่มฟังก์ชันเพื่อให้สามารถ "ยกเลิกการเลือก" Radio button ได้ (ถ้าคลิกซ้ำที่ตัวเดิม)
    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.addEventListener('click', function(e) {
            if (this.wasChecked) {
                this.checked = false;
                this.wasChecked = false;
            } else {
                // เคลียร์สถานะ wasChecked ของ radio ตัวอื่นในกลุ่มเดียวกัน
                const groupName = this.getAttribute('name');
                document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => r.wasChecked = false);
                this.wasChecked = true;
            }
        });
    });

    // 2. ระบบ Logout
    if (logoutBtn) {
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.addEventListener('click', () => {
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const diagnosisForm = document.querySelector('form');
    const cancelButton = document.querySelector('.btn-dark[style*="text-decoration: none"]');

    // 1. ฟังก์ชันสำหรับการดึงข้อมูลจาก Radio Buttons
    const getFormData = () => {
        const formData = new FormData(diagnosisForm);
        const selectedServices = {};

        // วนลูปหาค่าที่ถูกเลือกในแต่ละหมวด (p1 - p6)
        for (let i = 1; i <= 6; i++) {
                const fieldName = `p${i}`;
                const selectedOption = diagnosisForm.querySelector(`input[name="${fieldName}"]:checked`);
                
                if (selectedOption) {
                    // ดึง Text ที่อยู่ข้างๆ Radio
                    selectedServices[fieldName] = selectedOption.parentElement.textContent.trim();
                }
            }
            return selectedServices;
        };

        // 2. จัดการเมื่อกดปุ่ม "ยืนยัน"
diagnosisForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('order_id');
        const hn = urlParams.get('hn');

        const formData = new FormData(diagnosisForm);
        
        // สร้าง Object ข้อมูล และกำหนดค่าเริ่มต้นเป็น 'N' ตามแบบ oral_exam
        const data = {
            order_id: orderId,
            prevent: formData.get('p1') === 'Y' ? 'Y' : 'N',
            re_dentistry: formData.get('p2') === 'Y' ? 'Y' : 'N',
            oral_sur: formData.get('p3') === 'Y' ? 'Y' : 'N',
            root_treatment: formData.get('p4') === 'Y' ? 'Y' : 'N',
            endodontics: formData.get('p5') === 'Y' ? 'Y' : 'N',
            gp_disease: formData.get('p6') === 'Y' ? 'Y' : 'N'
        };

        try {
            const response = await fetch('/diagnosis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {
                alert('บันทึกการวินิจฉัยเรียบร้อยแล้ว');
                window.location.href = '/registration';
            } else {
                alert('บันทึกไม่สำเร็จ: ' + result.message);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
        }
    });
});


document.addEventListener('click', async (e) => {
    // หาปุ่มโดยไม่สนว่าจะเป็นตัวอักษรข้างใน หรือขอบปุ่ม
    const target = e.target.closest('.nav-admin-link, .btn-cancel-order');

    if (target) {
        // เช็คว่าลิงก์นั้นส่งไปหน้า registration หรือไม่ (ใช้ .pathname จะแม่นยำกว่า)
        const isRegis = target.pathname === '/registration' || target.getAttribute('href') === '/registration';
        
        if (isRegis) {
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get('order_id');

            if (orderId) {
                e.preventDefault(); // หยุดการเปลี่ยนหน้า

                if (confirm('คุณต้องการยกเลิกคิวงานนี้และกลับไปหน้าทะเบียนใช่หรือไม่?')) {
                    try {
                        const response = await fetch(`/delete-order/${orderId}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            window.location.href = '/registration';
                        } else {
                            window.location.href = '/registration';
                        }
                    } catch (err) {
                        window.location.href = '/registration';
                    }
                }
            }
        }
    }
});