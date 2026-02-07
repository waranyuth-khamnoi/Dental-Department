document.addEventListener('DOMContentLoaded', () => {
    // 1. อ้างอิง Element ต่างๆ
    const btnFinish = document.querySelector('.btn-finish');
    const patientName = document.querySelector('.patient-name').textContent.trim();
    const treatmentType = document.querySelector('.treatment-type').textContent.trim();

    // 2. จัดการปุ่ม "เสร็จสิ้นการรักษา"
    if (btnFinish) {
        btnFinish.addEventListener('click', () => {
            // สร้าง Pop-up ยืนยันการจบการรักษา
            const isConfirmed = confirm(`คุณต้องการยืนยันว่าการรักษา "${treatmentType}" \nของคนไข้ "${patientName}" เสร็จสิ้นแล้วใช่หรือไม่?`);
            
            if (isConfirmed) {
                // ส่วนนี้คือจุดที่ต้องเชื่อมต่อกับ API เพื่ออัปเดตสถานะในฐานข้อมูล
                console.log('สถานะการรักษา: เสร็จสิ้น');
                
                // ตัวอย่าง Action หลังจากกดยืนยัน
                alert('บันทึกข้อมูลเสร็จสิ้นเรียบร้อยแล้ว');
                
                // หลังจากรักษาเสร็จ อาจจะย้อนกลับไปหน้า "รายงานทันตกรรม"
                window.location.href = 'registration.html';
            }
        });
    }

    // 3. จัดการปุ่ม "นัดหมาย" (ใน HTML เป็น <a> tag)
    const btnAppointment = document.querySelector('a[href="new_appointment.html"]');
    if (btnAppointment) {
        btnAppointment.addEventListener('click', (e) => {
            // ตัวอย่าง: การส่งค่าชื่อคนไข้ผ่าน URL เพื่อไปใช้ในหน้านัดหมายใหม่
            e.preventDefault(); // ถ้าต้องการจัดการผ่าน JS ก่อนค่อยเปลี่ยนหน้า
            const targetUrl = `new_appointment.html?patient=${encodeURIComponent(patientName)}`;
            window.location.href = targetUrl;
            
            console.log('กำลังไปหน้าจองนัดหมายสำหรับ:', patientName);
        });
    }

    // 4. เพิ่มลูกเล่น Hover ให้กับการ์ด (Optional)
    const appointmentCard = document.querySelector('.appointment-card');
    if (appointmentCard) {
        appointmentCard.addEventListener('mouseenter', () => {
            appointmentCard.style.transform = 'translateY(-2px)';
            appointmentCard.style.transition = 'transform 0.2s ease-in-out';
        });
        appointmentCard.addEventListener('mouseleave', () => {
            appointmentCard.style.transform = 'translateY(0)';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. อ้างอิง Element ไอคอนออกจากระบบ (SVG path ที่อยู่ใน .icon-logout)
    const logoutBtn = document.querySelector('.icon-logout');

    if (logoutBtn) {
        // 2. จัดการเมื่อมีการคลิกปุ่มออกจากระบบ
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // 3. แสดงกล่องยืนยันเพื่อป้องกันการกดพลาด
            const confirmLogout = confirm("ยืนยันการออกจากระบบ?");

            if (confirmLogout) {
                // 4. ล้างข้อมูล Session หรือ Token (ถ้ามี)
                // sessionStorage.clear(); 
                // localStorage.removeItem('user_token');

                console.log("กำลังออกจากระบบ...");

                // 5. ส่งผู้ใช้กลับไปยังหน้า Login (สมมติว่าเป็นไฟล์ login.html)
                window.location.href = 'staff_login.html';
            }
        });

        // 6. เพิ่มสไตล์ให้ Cursor เป็นรูปมือเมื่อชี้ที่ไอคอน
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.setAttribute('title', 'ออกจากระบบ');
    }
});