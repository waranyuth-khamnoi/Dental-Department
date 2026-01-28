document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        // Add to clicked
        button.classList.add('active');
        
        // ตรงนี้สามารถเพิ่ม Logic การสลับหน้า Content ได้
    });
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