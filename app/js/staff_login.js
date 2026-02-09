document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('publicLoginForm');
    const loginBtn = document.getElementById('loginBtn');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // ป้องกันหน้าเว็บ Refresh เมื่อกดส่งฟอร์ม

        // 1. ดึงค่าจาก input
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // 2. ตรวจสอบเบื้องต้น (Client-side Validation)
        if (!username || !password) {
            alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
            return;
        }

        // เปลี่ยนสถานะปุ่มขณะกำลังโหลด
        loginBtn.innerText = 'กำลังเข้าสู่ระบบ...';
        loginBtn.disabled = true;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                alert('เข้าสู่ระบบสำเร็จ!');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', data.role);

                if (data.role === "1") {
                    window.location.href = '/registration'; 
                } else if (data.role === "0") {
                    window.location.href = '/staff_list'; 
                } else {
                    window.location.href = '/'; 
                }
            } else {
                alert(data.message);
                loginBtn.innerText = 'Sign In';
                loginBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
            loginBtn.innerText = 'Sign In';
            loginBtn.disabled = false;
        }
    });
});