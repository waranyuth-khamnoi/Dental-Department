document.addEventListener('DOMContentLoaded', () => {
    // 1. ดึงชื่อคนไข้จาก URL Parameter (ถ้ามีการส่งมาจากหน้า appointment.html)
    const urlParams = new URLSearchParams(window.location.search);
    const patientName = urlParams.get('patient');
    const nameLabel = document.querySelector('.input-group-name');

    if (patientName && nameLabel) {
        // แสดงชื่อคนไข้ที่ส่งมาใน Label
        const displayName = document.createElement('p');
        displayName.textContent = patientName;
        displayName.style.fontSize = '20px';
        displayName.style.fontWeight = '600';
        displayName.style.marginTop = '10px';
        nameLabel.appendChild(displayName);
    }

    // 2. จัดการปุ่มยืนยันการนัดหมาย
    const btnConfirm = document.querySelector('.btn-confirm');
    btnConfirm.addEventListener('click', () => {
        const dd = document.querySelector('input[placeholder="DD"]').value;
        const mm = document.querySelector('input[placeholder="MM"]').value;
        const yyyy = document.querySelector('input[placeholder="YYYY"]').value;
        const time = document.querySelector('.time-input').value;

        // Validation: ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
        if (!dd || !mm || !yyyy || !time) {
            alert('กรุณากรอก วันที่ และ เวลา นัดหมายให้ครบถ้วน');
            return;
        }

        // ตัวอย่างการแสดงผลก่อนส่งข้อมูลจริง
        const appointmentDate = `${dd}/${mm}/${yyyy}`;
        const confirmMsg = `ยืนยันการนัดหมายคุณ ${patientName || ''}\nวันที่: ${appointmentDate}\nเวลา: ${time} น.`;

        if (confirm(confirmMsg)) {
            alert('บันทึกการนัดหมายสำเร็จ!');
            // ส่งกลับไปหน้า registration
            window.location.href = '/registration';
        }
    });

    // 3. จัดการ Input ให้กรอกได้เฉพาะตัวเลข (สำหรับ DD, MM, YYYY)
    const dateInputs = document.querySelectorAll('.dob-input');
    dateInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    });
});

// ฟังก์ชันนี้ทำงานทุกหน้าที่มีปุ่ม Logout
document.addEventListener('DOMContentLoaded', () => {
    const logoutIcon = document.querySelector('.icon-logout');

    if (logoutIcon) {
        logoutIcon.style.cursor = 'pointer'; // เปลี่ยนเมาส์เป็นรูปมือ
        logoutIcon.addEventListener('click', (e) => {
            e.preventDefault();
            
            // แสดงกล่องยืนยัน
            const confirmLogout = confirm("ยืนยันการออกจากระบบ?");
            
            if (confirmLogout) {
                console.log("กำลังทำลาย Session...");
                // ในกรณีใช้งานจริง ให้ใส่ logic ลบ Token ที่นี่
                // sessionStorage.clear();
                
                // ย้อนกลับไปหน้าแรก (ปรับ path ตามจริง)
                window.location.href = '/staff_login'; 
            }
        });
    }
});