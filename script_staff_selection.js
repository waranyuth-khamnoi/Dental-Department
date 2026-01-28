document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        // ป้องกันหน้าเว็บ Refresh
        e.preventDefault();

        // ดึงค่าจากฟอร์ม
        const selectedDepartment = document.getElementById('department').value;
        const selectedWorkTime = document.querySelector('input[name="workTime"]:checked').value;

        // แสดงผลลัพธ์ (ในที่นี้คือการ Log ออกมาดู)
        console.log('ข้อมูลที่เข้าสู่ระบบ:', {
            department: selectedDepartment,
            workTime: selectedWorkTime
        });

        // ตัวอย่างการทำ Alert แจ้งเตือน
        alert(`เข้าสู่ระบบสำเร็จ!\nแผนก: ${selectedDepartment}\nประเภทเวลา: ${selectedWorkTime}`);
    });
});

