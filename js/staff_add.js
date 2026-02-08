document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const btnCancel = document.querySelector('.btn-cancel');
    const btnConfirm = document.querySelector('.btn-confirm');

    // 1. ฟังก์ชันยืนยันการเพิ่มข้อมูล (Submit)
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // ป้องกันการ Refresh หน้าจอ

        // ดึงค่าจากฟิลด์หลักเพื่อเช็คความว่างเปล่า
        const staffId = document.querySelector('.input-small').value;
        const firstName = document.querySelectorAll('input[type="text"]')[1].value;
        const lastName = document.querySelectorAll('input[type="text"]')[2].value;

        if (!staffId || !firstName || !lastName) {
            alert('กรุณากรอกข้อมูลที่จำเป็น (รหัสพนักงาน, ชื่อ, นามสกุล) ให้ครบถ้วน');
            return;
        }

        const isConfirmed = confirm('ยืนยันการบันทึกข้อมูลบุคลากรใหม่ใช่หรือไม่?');
        if (isConfirmed) {
            console.log('บันทึกข้อมูลรหัส:', staffId);
            alert('เพิ่มข้อมูลสำเร็จ!');
            window.location.href = 'staff_manage.html'; // บันทึกเสร็จกลับไปหน้าจัดการ
        }
    });

    // 2. ฟังก์ชันปุ่มยกเลิก (Cancel)
    btnCancel.addEventListener('click', () => {
        if (confirm('คุณต้องการยกเลิกการเพิ่มข้อมูลและกลับสู่หน้าก่อนหน้าใช่หรือไม่? ข้อมูลที่กรอกไว้จะหายไป')) {
            window.location.href = 'staff_manage.html';
        }
    });

    // 3. ระบบจำกัดการพิมพ์ (Input Masking)
    const allInputs = document.querySelectorAll('input[type="text"]');
    
    // ช่องรหัสพนักงาน, เลขบัตร, เบอร์โทร, และวันที่ ให้พิมพ์ได้เฉพาะตัวเลข
    const numericIndices = [0, 3, 4, 5, 6, 7]; // อ้างอิง index จากลำดับใน HTML
    numericIndices.forEach(index => {
        if(allInputs[index]) {
            allInputs[index].addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }
    });

    // 4. ระบบ Logout (ใช้ logic เดียวกับหน้าอื่น)
    const logoutBtn = document.querySelectorAll('.user-actions .icon-btn')[1];
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("ยืนยันการออกจากระบบ?")) {
                window.location.href = 'staff_login.html';
            }
        });
    }
});