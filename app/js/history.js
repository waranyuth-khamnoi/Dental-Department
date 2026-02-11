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

    tableRows.forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            const orderId = row.getAttribute('data-orderid'); // ดึงค่าจาก <tr data-orderid="...">
            if (orderId) {
                // ส่ง order_id ไปทาง URL query string
                window.location.href = `/patient_info_h?order_id=${orderId}`;
            }
        });
    });
});
