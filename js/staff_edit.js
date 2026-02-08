document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.querySelector('.form-content');
    const btnCancel = document.querySelector('.btn-cancel');

    const logoutBtn = document.querySelector('.logout-icon');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); // ป้องกันการเปลี่ยนหน้าทันที

            if (confirm('ยืนยันการออกจากระบบ?')) {
                // 1. ล้างข้อมูล Session หรือ Token (ถ้ามี)
                // localStorage.removeItem('userToken');
                // sessionStorage.clear();

                // 2. ส่งผู้ใช้ไปยังหน้า Login
                console.log('Logging out...');
                window.location.href = 'staff_login.html'; // เปลี่ยนชื่อไฟล์ตามหน้า Login จริงของคุณ
            }
        });
    }

    // 1. ฟังก์ชันดึงพารามิเตอร์จาก URL (กรณีเปิดมาจากหน้าจัดการแล้วส่ง ID มา)
    // ตัวอย่าง: staff_edit.html?id=468286
    const urlParams = new URLSearchParams(window.location.search);
    const staffId = urlParams.get('id');

    if (staffId) {
        console.log('กำลังแก้ไขข้อมูลบุคลากรรหัส:', staffId);
        // ตรงนี้ในอนาคตสามารถเขียนฟังก์ชันดึงข้อมูลจาก Database มาแสดงผลได้
    }

    // 2. จัดการปุ่ม "ยกเลิก"
    btnCancel.addEventListener('click', () => {
        if (confirm('คุณต้องการยกเลิกการแก้ไขใช่หรือไม่? (ข้อมูลที่กรอกจะไม่ถูกบันทึก)')) {
            window.location.href = 'staff_manage.html';
        }
    });

    // 3. จัดการการส่งฟอร์ม (Submit Form)
    editForm.addEventListener('submit', (e) => {
        e.preventDefault(); // ป้องกันการ Refresh หน้าจอ

        // รวบรวมข้อมูลจาก Form
        const formData = {
            staffCode: editForm.querySelector('input[type="text"][value]').value, // ตัวอย่างการดึงค่า
            prefix: editForm.querySelector('input[name="prefix"]:checked')?.parentElement.textContent.trim(),
            firstName: editForm.querySelectorAll('.two-cols input')[0].value,
            lastName: editForm.querySelectorAll('.two-cols input')[1].value,
            idCard: editForm.querySelectorAll('.two-cols input')[2].value,
            birthDate: {
                day: editForm.querySelector('.date-sm:nth-child(1)').value,
                month: editForm.querySelector('.date-sm:nth-child(2)').value,
                year: editForm.querySelector('.date-md').value
            },
            phone: editForm.querySelectorAll('.two-cols input')[3].value,
            email: editForm.querySelector('input[type="email"]').value,
            position: editForm.querySelector('.custom-select').value
        };

        console.log('ข้อมูลที่พร้อมบันทึก:', formData);

        // จำลองการเชื่อมต่อ API
        saveStaffData(formData);
    });
});

// ฟังก์ชันจำลองการบันทึกข้อมูล
function saveStaffData(data) {
    // แสดง loading หรือปิดปุ่มเพื่อป้องกันการกดซ้ำ
    const btnConfirm = document.querySelector('.btn-confirm');
    btnConfirm.disabled = true;
    btnConfirm.innerText = 'กำลังบันทึก...';

    setTimeout(() => {
        alert('บันทึกข้อมูลสำเร็จ!');
        window.location.href = 'staff_manage.html';
    }, 1500);
}

