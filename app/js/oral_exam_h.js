document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.icon-logout');

    // ระบบ Logout
    if (logoutBtn) {
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.addEventListener('click', () => {
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }

    // หมายเหตุ: หน้า History ไม่ต้องใส่ Logic จัดการ Checkbox 
    // เพราะข้อมูลถูก Render แบบ disabled มาจาก Server (EJS) แล้ว
});