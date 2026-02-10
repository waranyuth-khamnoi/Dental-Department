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
    e.preventDefault();

    // 1. ดึง order_id จาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');

    // 2. ฟังก์ชันช่วยดึงค่า Radio ที่ถูกเลือก
    const getRadioValue = (name) => document.querySelector(`input[name="${name}"]:checked`)?.parentElement.innerText.trim();

    const data = {
        order_id: orderId, // เพิ่มฟิลด์นี้
        p1: getRadioValue('p1'),
        p2: getRadioValue('p2'),
        p3: getRadioValue('p3'),
        p4: getRadioValue('p4'),
        p5: getRadioValue('p5'),
        p6: getRadioValue('p6')
    };

    // 3. ส่งข้อมูลไปที่ Server
    fetch('/save-diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(() => {
        alert('บันทึกการวินิจฉัยเรียบร้อยแล้ว');
        window.location.href = '/registration'; // กลับหน้าหลัก
    });
});
});