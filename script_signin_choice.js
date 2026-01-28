document.addEventListener('DOMContentLoaded', () => {
    // เลือกปุ่มทางเลือกทั้งสอง
    const authButtons = document.querySelectorAll('.auth-btn');

    authButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // ดึงข้อความจากปุ่มเพื่อใช้ในการตรวจสอบ (Log)
            const choice = button.textContent.trim();
            console.log(`User selected: ${choice}`);
            
            // คุณสามารถเพิ่ม Logic เพิ่มเติมที่นี่ก่อนเปลี่ยนหน้า 
            // เช่น การเก็บสถานะลงใน SessionStorage
            if (choice.includes('ประชาชน')) {
                sessionStorage.setItem('userRole', 'patient');
            } else {
                sessionStorage.setItem('userRole', 'staff');
            }
        });
    });

    // เอฟเฟกต์เบื้องต้นเมื่อโหลดหน้าเสร็จ (ถ้าต้องการ)
    const container = document.querySelector('.auth-container');
    if (container) {
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.8s ease-in-out';
        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);
    }
});