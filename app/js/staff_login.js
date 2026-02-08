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
            // 3. จำลองการส่งข้อมูลไปที่ Backend API
            // ในสถานการณ์จริง คุณต้องเปลี่ยน URL เป็น endpoint ของเซิร์ฟเวอร์คุณ
            const response = await simulateApiCall(username, password);

            if (response.success) {
                alert('เข้าสู่ระบบสำเร็จ!');
                // เก็บ Token หรือสถานะการ Login (ถ้ามี)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('staffName', username);

                // 4. Redirect ไปยังหน้า registrayion
                window.location.href = '/registration'; 
            } else {
                alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
                loginBtn.innerText = 'Sign In';
                loginBtn.disabled = false;
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
            loginBtn.innerText = 'Sign In';
            loginBtn.disabled = false;
        }
    });
});

// ฟังก์ชันจำลองการเช็ค Login (เพื่อใช้ทดสอบก่อนต่อ Database จริง)
function simulateApiCall(username, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // ทดสอบด้วย: user: admin / pass: 1234
            if (username === 'admin' && password === '1234') {
                resolve({ success: true });
            } else {
                resolve({ success: false });
            }
        }, 1000);
    });
}