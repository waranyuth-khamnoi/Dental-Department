// 1. ตัวแปรสำหรับล็อคการส่งข้อมูล (ป้องกันการกดรัว หรือ Double Click)
let isCreatingOrder = false;

/**
 * ฟังก์ชันสำหรับสร้าง Order ใหม่
 * @param {string} hn - รหัส HN ของคนไข้
 */
async function createOrder(hn) {
    // ถ้ากำลังทำงานอยู่ (true) ให้หยุดฟังก์ชันทันที
    if (isCreatingOrder) {
        console.log("ระบบกำลังประมวลผล กรุณารอสักครู่...");
        return;
    }

    // ดึงค่า staff_id จาก input hidden ในหน้า registration.ejs
    const staffIdElement = document.getElementById('current_staff_id');
    const staffId = staffIdElement ? staffIdElement.value : null;

    if (!staffId || staffId === "" || staffId === "undefined") {
        alert("ไม่พบข้อมูลเจ้าหน้าที่ กรุณาล็อกอินใหม่");
        window.location.href = '/staff_login';
        return;
    }

    // เริ่มทำงาน: ล็อคสถานะป้องกันการกดซ้ำ
    isCreatingOrder = true;
    console.log("กำลังสร้าง Order สำหรับ HN:", hn, "โดย Staff ID:", staffId);

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
            // เมื่อสำเร็จ ย้ายหน้าไปยังหน้าข้อมูลคนไข้พร้อมเลข order_id ใหม่
            window.location.href = `/patient_info?hn=${hn}&order_id=${result.order_id}`;
        } else {
            alert("สร้างใบสั่งงานไม่สำเร็จ: " + (result.message || "เกิดข้อผิดพลาดที่ระบบ"));
            isCreatingOrder = false; // ปลดล็อกถ้าไม่สำเร็จ เพื่อให้กดใหม่ได้
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        isCreatingOrder = false; // ปลดล็อกถ้า Error เพื่อให้กดใหม่ได้
    }
}

// 2. ส่วนจัดการ UI (ทำงานเมื่อโหลดหน้า HTML เสร็จ)
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    const logoutBtn = document.querySelector('.icon-logout');

    // --- ระบบค้นหา (Search) ---
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            tableRows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // --- ระบบ Logout ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
                window.location.href = '/staff_login';
            }
        });
    }

    /* หมายเหตุสำคัญ: 
       ห้ามใส่โค้ดประเภท tableRows.forEach(row => row.addEventListener('click', ...)) ในนี้ 
       เพราะเราใช้ onclick="createOrder(...)" โดยตรงในไฟล์ registration.ejs แล้ว 
       การใส่ซ้ำจะทำให้ฟังก์ชันทำงาน 2 รอบ (เบิ้ล 2 Order) ครับ
    */
});