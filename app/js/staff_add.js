document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const btnCancel = document.querySelector('.btn-cancel');
    const btnConfirm = document.querySelector('.btn-confirm');

    // 1. ฟังก์ชันยืนยันการบันทึกข้อมูล (Submit)
    form.addEventListener('submit', (e) => {
        // ถามเพื่อความแน่ใจก่อนส่งข้อมูล
        const isConfirmed = confirm('ยืนยันการบันทึกข้อมูลบุคลากรใหม่ใช่หรือไม่?');
        
        if (!isConfirmed) {
            e.preventDefault(); // ถ้ากด Cancel ใน Popup จะไม่ส่งข้อมูล
        }
        // ถ้ากด OK ฟอร์มจะส่งข้อมูลไปที่ Action "/staff_add" ใน router.js อัตโนมัติ
    });

    // 2. ฟังก์ชันปุ่มยกเลิก (Cancel)
    btnCancel.addEventListener('click', () => {
        if (confirm('คุณต้องการยกเลิกการเพิ่มข้อมูลและกลับสู่หน้าก่อนหน้าใช่หรือไม่? ข้อมูลที่กรอกไว้จะหายไป')) {
            window.location.href = '/staff_manage';
        }
    });

    // 3. ระบบจำกัดการพิมพ์ (Input Masking) เฉพาะตัวเลข
    // ดึง input ตาม name ที่เราตั้งใน HTML
    const numericInputs = ['staff_id', 'id_card', 'phone'];
    numericInputs.forEach(name => {
        const input = document.querySelector(`input[name="${name}"]`);
        if (input) {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }
    });

    // 4. ระบบ Logout
    const logoutBtn = document.querySelectorAll('.user-actions .icon-btn')[1];
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("ยืนยันการออกจากระบบ?")) {
                window.location.href = '/staff_login';
            }
        });
    }
});

