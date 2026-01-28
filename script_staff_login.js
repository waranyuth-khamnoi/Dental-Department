document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('publicLoginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บรีโหลดเอง

            // จำลองการตรวจสอบข้อมูลเบื้องต้น
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                // คำสั่งเด้งไปยังหน้า 
                window.location.href = 'staff_selection.html'; 
            } else {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            }
        });
    }
});

