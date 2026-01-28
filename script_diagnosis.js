document.getElementById('treatmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const results = {};

    // วนลูปเก็บค่าจากแต่ละ Group
    formData.forEach((value, key) => {
        results[key] = value;
    });

    if (Object.keys(results).length === 0) {
        alert("กรุณาเลือกรายการหัตถการ");
    } else {
        console.log("ข้อมูลที่พร้อมส่งไป Server:", results);
        alert("บันทึกข้อมูลสำเร็จ (ดูรายละเอียดใน Console)");
    }
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