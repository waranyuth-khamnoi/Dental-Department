document.addEventListener('DOMContentLoaded', () => {
    const diagnosisForm = document.getElementById('diagnosisForm');
    const logoutBtn = document.querySelector('.icon-logout');

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
    diagnosisForm.addEventListener('submit', (e) => {
        e.preventDefault(); // ป้องกันการรีโหลดหน้าจอ

        const data = getFormData();

        // ตรวจสอบว่ามีการเลือกอย่างน้อย 1 รายการหรือไม่
        if (Object.keys(data).length === 0) {
            alert('กรุณาเลือกรายการหัตถการอย่างน้อย 1 รายการ');
            return;
        }

        // แสดงผลข้อมูล (ในที่นี้คือ Log ไว้ดู หากต่อ Database สามารถใช้ fetch ได้ตรงนี้)
        console.log('ข้อมูลที่เลือก:', data);
        
        // ตัวอย่าง SweetAlert หรือ Alert ธรรมดา
        alert('บันทึกข้อมูลการตรวจและวินิจฉัยเรียบร้อยแล้ว');
        
        // หากต้องการเปลี่ยนหน้าหลังจากบันทึกสำเร็จ
        window.location.href = 'registration.html';
    });

    // 3. เพิ่มลูกเล่น: คลิกที่ตัวอักษรแล้ว Radio ทำงาน (เพิ่ม User Experience)
    const optionItems = document.querySelectorAll('.option-item');
    optionItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.color = '#FF9F00';
        });
        item.addEventListener('mouseout', () => {
            item.style.color = 'inherit';
        });
    });

    // 4. จัดการปุ่มยกเลิก (เพิ่มการยืนยันก่อนออก)
    cancelButton.addEventListener('click', (e) => {
        const data = getFormData();
        if (Object.keys(data).length > 0) {
            const confirmLeave = confirm('คุณมีการเลือกรายการค้างอยู่ ต้องการยกเลิกและกลับหน้าหลักใช่หรือไม่?');
            if (!confirmLeave) {
                e.preventDefault();
            }
        }
    });
});
