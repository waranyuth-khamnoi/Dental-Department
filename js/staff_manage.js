document.addEventListener('DOMContentLoaded', () => {
    // 1. ระบบค้นหา (Search Logic)
    const searchInput = document.querySelector('.search-box input');
    const tableRows = document.querySelectorAll('.staff-table tbody tr');

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        tableRows.forEach(row => {
            // ค้นหาจากทุกคอลัมน์ในแถวนั้น
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchTerm) ? "" : "none";
        });
    });

    // 2. ระบบลบข้อมูล (Delete Logic)
    const deleteButtons = document.querySelectorAll('.action-btn.delete');

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // ดึงชื่อพนักงานจากคอลัมน์ที่ 2 เพื่อใช้แสดงในตัวยืนยัน
            const row = this.closest('tr');
            const staffName = row.cells[1].textContent + " " + row.cells[2].textContent;
            const staffId = row.cells[0].textContent;

            const confirmDelete = confirm(`คุณต้องการลบข้อมูลของ "${staffName}" (รหัส: ${staffId}) ใช่หรือไม่?`);
            
            if (confirmDelete) {
                // ในระบบจริงต้องส่งค่า staffId ไปที่ API
                console.log(`กำลังลบพนักงานรหัส: ${staffId}`);
                
                // เอฟเฟกต์ค่อยๆ จางหายก่อนลบแถวทิ้ง
                row.style.transition = "opacity 0.3s ease";
                row.style.opacity = "0";
                setTimeout(() => {
                    row.remove();
                    alert("ลบข้อมูลสำเร็จ");
                }, 300);
            }
        });
    });

    // 3. ระบบ Logout
    const logoutBtn = document.querySelectorAll('.user-actions .icon-btn')[1]; // ปุ่มไอคอนตัวที่สอง
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("ยืนยันการออกจากระบบ?")) {
                window.location.href = 'staff_login.html';
            }
        });
    }

    // 4. แก้ไขปุ่ม Edit ที่เป็น <button> ให้ลิงก์ไปยังหน้าแก้ไขได้
    const editButtons = document.querySelectorAll('.action-btn.edit');
    editButtons.forEach(btn => {
        // เช็คเผื่อไว้ในกรณีที่เป็น <button> ไม่ใช่ <a>
        if (btn.tagName === 'BUTTON') {
            btn.addEventListener('click', function() {
                const staffId = this.closest('tr').cells[0].textContent;
                window.location.href = `staff_edit.html?id=${staffId}`;
            });
        }
    });
});