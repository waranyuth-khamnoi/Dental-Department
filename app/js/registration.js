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
                window.location.href = '/staff_login';
            }
        });
    }

    // 4. การจัดการคลิกบนแถว (Row Click)
    // ใน HTML คุณใส่ onclick ไว้ที่แถวแรกแล้ว แต่แถวต่อๆ ไปยังไม่มี
    // ใช้ JS จัดการจะช่วยให้โค้ดสะอาดกว่า
   tableRows.forEach(row => {
    row.addEventListener('click', () => {
        // ดึงค่า hn จากคอลัมน์แรก (td ตัวแรก)
        const hn = row.cells[0].innerText.trim(); 
        
        // ส่งไปที่ Route /create-order เพื่อสร้างเลข Order ใน DB
        window.location.href = `/create-order?hn=${hn}`;
    });
});
});

async function createOrder(hn) { 
    const staffIdElement = document.getElementById('current_staff_id');
    
    if (!staffIdElement || !staffIdElement.value) {
        alert("ไม่พบข้อมูลเจ้าหน้าที่ กรุณาล็อกอินใหม่");
        return;
    }

    const staffId = staffIdElement.value;
    console.log("กำลังสร้าง Order สำหรับ HN:", hn, "โดย Staff:", staffId); // เช็คใน Console ดูว่าค่ามาไหม

    try {
        const response = await fetch('/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                hn: hn, 
                staff_id: staffId 
            })
        });

        const result = await response.json();
        if (result.success) {
            window.location.href = `/patient_info?hn=${hn}&order_id=${result.order_id}`;
        } else {
            alert("สร้างใบสั่งงานไม่สำเร็จ: " + (result.message || ""));
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
}

// 2. ส่วนจัดการ UI อื่นๆ
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    const logoutBtn = document.querySelector('.icon-logout');

    // ระบบค้นหา
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            tableRows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    
});