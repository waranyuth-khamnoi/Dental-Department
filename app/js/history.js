document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ระบบค้นหา (Search Functionality) ---
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.patient-table tbody tr');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        tableRows.forEach(row => {
            // ดึงข้อความทั้งหมดภายในแถวนั้นๆ มาเช็ค
            const text = row.textContent.toLowerCase();
            
            if (text.includes(searchTerm)) {
                row.style.display = ''; // แสดงแถว
            } else {
                row.style.display = 'none'; // ซ่อนแถว
            }
        });
    });

    // --- 2. การจัดการปุ่ม User Actions (Profile & Logout) ---
    const actionButtons = document.querySelectorAll('.icon-btn');
    
    // ปุ่มที่สอง (Logout)
    actionButtons[1].addEventListener('click', () => {
        if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
            // สมมติว่าส่งกลับไปหน้า Login
            window.location.href = '/staff_login'; 
        }
    });

    // --- 3. (Optional) คลิกที่แถวเพื่อดูรายละเอียด ---
    tableRows.forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            const patientName = row.cells[3].innerText;
            console.log('เลือกระเบียนของ:', patientName);
            // เพิ่ม Logic การเปิด Modal หรือไปหน้าดูรายละเอียดที่นี่
        });
    });

    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            // ดึงชื่อคนไข้จาก column ที่ 4 (index 3) มาแสดงตัวอย่าง
            const patientName = row.cells[3].innerText;
            console.log(`เลือกคนไข้: ${patientName}`);
            
            // หากต้องการให้ทุกแถวคลิกแล้วไปหน้าเดียวกัน:
            window.location.href = '/patient_info_h';
        });
    });
});
