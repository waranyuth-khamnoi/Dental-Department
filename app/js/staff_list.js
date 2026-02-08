document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input');
    const tableRows = document.querySelectorAll('.staff-table tbody tr');

    // 1. ระบบค้นหา (Search Logic)
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        tableRows.forEach(row => {
            // ดึงข้อความทั้งหมดในแถวนั้นๆ มาเช็ค
            const rowText = row.textContent.toLowerCase();
            
            if (rowText.includes(searchTerm)) {
                row.style.display = ""; // แสดงแถว
            } else {
                row.style.display = "none"; // ซ่อนแถว
            }
        });
    });

    // 2. ระบบการคลิกแถว (Row Navigation)
    // สำหรับแถวที่ยังไม่ได้เขียน onclick ไว้ใน HTML
    tableRows.forEach(row => {
        if (!row.getAttribute('onclick')) {
            row.style.cursor = 'pointer';
            row.addEventListener('click', () => {
                // สมมติว่าส่ง ID ไปทาง URL (ปรับเปลี่ยนตามความเหมาะสม)
                const staffId = row.cells[0].textContent;
                window.location.href = `/staff_info?id=${staffId}`;
            });
        }
    });

    // 3. ปุ่ม Logout (ตัวอย่างการทำงาน)
    const logoutBtn = document.querySelectorAll('.icon-btn')[1]; // ปุ่มที่สอง
    logoutBtn.addEventListener('click', () => {
        if (confirm('ยืนยันการออกจากระบบ?')) {
            console.log('Logging out...');
            window.location.href = '/staff_login';
        }
    });
});