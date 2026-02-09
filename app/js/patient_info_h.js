document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.icon-logout');
    const diseaseRadios = document.querySelectorAll('input[name="disease"]');
    const allergyRadios = document.querySelectorAll('input[name="allergy"]');
    const idCardInput = document.querySelector('input[placeholder*="13 หลัก"]');

    // 1. ระบบจัดการการกรอกข้อมูลเพิ่มเติม (โรคประจำตัว/แพ้ยา)
    const toggleExtraInput = (radios) => {
        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                // ค้นหาช่อง input ที่อยู่ใกล้ที่สุด (ถัดจาก label)
                const extraInput = e.target.closest('.radio-inline').querySelector('.inline-input');
                if (extraInput) {
                    // ถ้าเลือก "มี (ระบุ)" ให้เปิดช่องกรอก ถ้า "ไม่มี" ให้ปิดและล้างค่า
                    if (e.target.parentElement.innerText.includes('มี')) {
                        extraInput.disabled = false;
                        extraInput.focus();
                    } else {
                        extraInput.disabled = true;
                        extraInput.value = '';
                    }
                }
            });
        });
    };

    toggleExtraInput(diseaseRadios);
    toggleExtraInput(allergyRadios);

    // 2. ตรวจสอบเลขบัตรประชาชน (13 หลัก) ให้พิมพ์ได้เฉพาะตัวเลข
    if (idCardInput) {
        idCardInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // ลบตัวอักษรที่ไม่ใช่ตัวเลข
            if (e.target.value.length > 13) {
                e.target.value = e.target.value.slice(0, 13); // จำกัด 13 หลัก
            }
        });
    }

    // 3. ระบบ Logout
    if (logoutBtn) {
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.addEventListener('click', () => {
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }

    // 4. ฟังก์ชันสำหรับการบันทึกข้อมูล (Save Function)
    // หมายเหตุ: ใน CSS ของคุณมี .btn-confirm 
    // คุณอาจต้องเพิ่มปุ่มนี้ใน HTML เพื่อเรียกใช้งาน
    const savePatientData = () => {
        const patientData = {
            firstName: document.querySelector('input[value="ม่อนจุ๊กกุ๊ก"]').value,
            lastName: document.querySelector('input[value="อิอิ"]').value,
            idCard: idCardInput.value,
            // เพิ่มการเก็บค่าอื่นๆ ตามต้องการ
        };
        console.log('กำลังบันทึกข้อมูลผู้ป่วย:', patientData);
        alert('บันทึกข้อมูลสำเร็จ');
    };
});