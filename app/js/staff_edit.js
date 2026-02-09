document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.querySelector('.form-content');
    const btnCancel = document.querySelector('.btn-cancel');
    const logoutBtn = document.querySelector('.logout-icon');

    // 1. จัดการการออกจากระบบ
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }

    // 2. จัดการปุ่ม "ยกเลิก"
    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            if (confirm('คุณต้องการยกเลิกการแก้ไขใช่หรือไม่? (ข้อมูลที่กรอกจะไม่ถูกบันทึก)')) {
                window.location.href = '/staff_manage';
            }
        });
    }

    /* 3. การจัดการการส่งฟอร์ม (Submit Form)
       หมายเหตุ: หากใน HTML <form> มี action="/staff_update" และ method="POST" แล้ว 
       เราไม่จำเป็นต้องใช้ e.preventDefault() เว้นแต่จะส่งข้อมูลผ่าน API (AJAX/Fetch)
    */
    editForm.addEventListener('submit', (e) => {
        // แสดงการยืนยันก่อนส่งข้อมูล
        if (!confirm('ยืนยันการบันทึกการเปลี่ยนแปลงข้อมูลบุคลากร?')) {
            e.preventDefault(); // ยกเลิกการส่งถ้าผู้ใช้ไม่ยืนยัน
        } else {
            // ปล่อยให้ฟอร์มส่งข้อมูลไปยัง action="/staff_update" ตามปกติ
            console.log('กำลังส่งข้อมูลไปที่ server...');
        }
    });
});
