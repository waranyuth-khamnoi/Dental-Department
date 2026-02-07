document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    const dateInputs = document.querySelectorAll('.date-input');
    const logoutBtn = document.querySelector('.icon-logout');

    // 1. ระบบค้นหา (Search Function)
    // ค้นหาได้จากทุกคอลัมน์ในตาราง (ชื่อ, การรักษา, ผลวินิจฉัย)
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        tableRows.forEach(row => {
            const text = row.innerText.toLowerCase();
            // ถ้าคำที่ค้นหาอยู่ในแถวนั้น ให้แสดงผล ถ้าไม่ให้ซ่อน
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // 2. ระบบจัดการวันที่ (Date Selector)
    // เบื้องต้นทำหน้าที่ดักจับการเปลี่ยนแปลงค่า (สามารถต่อยอดเชื่อมกับ Database ได้)
    dateInputs.forEach(input => {
        input.addEventListener('change', () => {
            const day = dateInputs[0].value;
            const month = dateInputs[1].value;
            const year = dateInputs[2].value;
            console.log(`กำลังค้นหาข้อมูลวันที่: ${day}/${month}/${year}`);
            // ตรงนี้สามารถเพิ่ม logic สำหรับการ fetch ข้อมูลใหม่จาก server ตามวันที่ได้
        });
    });

    // 3. ระบบ Logout
    if (logoutBtn) {
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.addEventListener('click', () => {
            if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
                // ลบข้อมูล session และกลับไปหน้า Login
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'staff_login.html';
            }
        });
    }

    // 4. การจัดการคลิกบนแถว (Row Click)
    // ใน HTML คุณใส่ onclick ไว้ที่แถวแรกแล้ว แต่แถวต่อๆ ไปยังไม่มี
    // ใช้ JS จัดการจะช่วยให้โค้ดสะอาดกว่า
    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            // ดึงชื่อคนไข้จาก column ที่ 4 (index 3) มาแสดงตัวอย่าง
            const patientName = row.cells[3].innerText;
            console.log(`เลือกคนไข้: ${patientName}`);
            
            // หากต้องการให้ทุกแถวคลิกแล้วไปหน้าเดียวกัน:
            // window.location.href = 'patient_info.html';
        });
    });
});