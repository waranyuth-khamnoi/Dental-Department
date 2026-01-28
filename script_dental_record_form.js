document.getElementById('treatmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // เก็บข้อมูลจาก Checkbox (หัตถการ)
    const procedures = Array.from(document.querySelectorAll('input[name="procedure"]:checked'))
                            .map(cb => cb.value);

    // เก็บข้อมูลจาก Radio (ผลการรักษา)
    const result = document.querySelector('input[name="result"]:checked')?.value;

    if (procedures.length === 0 || !result) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    console.log("ข้อมูลที่บันทึก:", {
        procedures: procedures,
        result: result
    });

    alert("บันทึกข้อมูลสำเร็จ!");
});

// ฟังก์ชันสำหรับปุ่มยกเลิก
document.querySelector('.btn-cancel').addEventListener('click', () => {
    if(confirm("คุณต้องการยกเลิกการกรอกข้อมูลใช่หรือไม่?")) {
        document.getElementById('treatmentForm').reset();
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