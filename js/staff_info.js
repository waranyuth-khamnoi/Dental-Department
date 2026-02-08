document.addEventListener('DOMContentLoaded', () => {
    // 1. ดึงข้อมูลจาก URL (เช่น ?id=468286) มาแสดงผลในฟอร์ม
    const getStaffDataFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const staffId = urlParams.get('id');

        if (staffId) {
            // ในที่นี้คือตัวอย่างการนำ ID มาใส่ในช่องรหัสพนักงาน
            // หากใช้งานจริง ส่วนนี้มักจะเป็นการ fetch ข้อมูลจาก Database/API
            document.querySelector('.input-small').value = staffId;
            console.log("กำลังแสดงข้อมูลของรหัสพนักงาน:", staffId);
        }
    };

    // 2. ฟังก์ชันสำหรับควบคุม Input (Validation เบื้องต้น)
    const setupFormValidation = () => {
        const citizenIdInput = document.querySelector('input[value="1479832340"]'); // ช่องเลขบัตร
        const phoneInput = document.querySelector('input[value="0537216322"]');    // ช่องเบอร์โทร

        // จำกัดให้พิมพ์ได้เฉพาะตัวเลข
        [citizenIdInput, phoneInput].forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        });
    };

    // 3. ฟังก์ชันปุ่มย้อนกลับ (แอบเพิ่มลูกเล่นการยืนยันถ้ามีการแก้ไข)
    let isDirty = false;
    const formInputs = document.querySelectorAll('input');
    formInputs.forEach(input => {
        input.addEventListener('change', () => isDirty = true);
    });

    // เรียกใช้งานฟังก์ชัน
    getStaffDataFromURL();
    setupFormValidation();

    const logoutBtn = document.querySelectorAll('.icon-btn')[1]; // ปุ่มที่สอง
    logoutBtn.addEventListener('click', () => {
        if (confirm('ยืนยันการออกจากระบบ?')) {
            console.log('Logging out...');
            window.location.href = 'staff_login.html';
        }
    });
});