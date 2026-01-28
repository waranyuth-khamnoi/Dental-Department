document.querySelector('.btn-confirm').addEventListener('click', () => {
    const name = document.getElementById('patientName').value;
    if(name) {
        alert('บันทึกข้อมูลของ ' + name + ' เรียบร้อยแล้ว');
    } else {
        alert('กรุณากรอกชื่อ-นามสกุล');
    }
});

document.querySelector('.btn-cancel').addEventListener('click', () => {
    if(confirm('คุณต้องการยกเลิกการทำรายการหรือไม่?')) {
        document.getElementById('patientName').value = '';
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