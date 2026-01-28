document.addEventListener('DOMContentLoaded', () => {
    const dentalForm = document.getElementById('dentalForm');

    // จัดการการส่งข้อมูล
    dentalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // เก็บข้อมูลจาก Form
        const formData = new FormData(dentalForm);
        const data = Object.fromEntries(formData.entries());
        
        console.log('ข้อมูลที่บันทึก:', data);
        alert('บันทึกข้อมูลสำเร็จ!');
    });

    // ตัวอย่างการสลับ Tab (เบื้องต้น)
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
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