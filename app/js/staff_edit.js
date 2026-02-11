document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.querySelector('.form-content');
    const btnCancel = document.querySelector('.btn-cancel');
    const logoutBtn = document.querySelector('.logout-icon');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            if (confirm('คุณต้องการยกเลิกการแก้ไขใช่หรือไม่? (ข้อมูลที่กรอกจะไม่ถูกบันทึก)')) {
                window.location.href = '/staff_manage';
            }
        });
    }

    editForm.addEventListener('submit', (e) => {
        if (!confirm('ยืนยันการบันทึกการเปลี่ยนแปลงข้อมูลบุคลากร?')) {
            e.preventDefault();
        } else {
            console.log('กำลังส่งข้อมูลไปที่ server...');
        }
    });
});
