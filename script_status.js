// ตัวอย่าง: สมมติว่าสถานะปัจจุบันคือ 2 (ยืนยันนัดหมาย)
const currentStatus = 2;

function updateStatusUI(statusId) {
    const steps = document.querySelectorAll('.circle');
    
    steps.forEach((circle, index) => {
        const stepNum = index + 1;
        
        if (stepNum === statusId) {
            // เน้นสีสถานะปัจจุบัน
            circle.style.border = "4px solid #f1b335";
            circle.style.transform = "scale(1.1)";
        } else if (stepNum < statusId) {
            // สถานะที่ผ่านมาแล้ว (อาจเปลี่ยนเป็นสีเขียวหรือสีทึบลง)
            circle.style.opacity = "0.6";
        }
    });
}

// เรียกใช้งาน
document.addEventListener('DOMContentLoaded', () => {
    updateStatusUI(currentStatus);
});

document.addEventListener('DOMContentLoaded', () => {
    // ฟังก์ชันสำหรับจัดการการคลิกที่เมนู
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        card.addEventListener('click', (e) => {
            console.log('กำลังไปที่หน้า: ' + e.target.innerText);
        });
    });

    // ฟังก์ชัน Logout เบื้องต้น
    const logoutBtn = document.querySelector('button[aria-label="Logout"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
                window.location.href = 'signin_choice.html';
            }
        });
    }
});