let isCreatingOrder = false;

/**
 * ฟังก์ชันสำหรับสร้าง Order ใหม่
 * @param {string} hn
 */
async function createOrder(hn) {
    if (isCreatingOrder) return;

    const staffIdElement = document.getElementById('current_staff_id');
    const staffId = staffIdElement ? staffIdElement.value : null;

    if (!staffId || staffId === "undefined" || staffId === "") {
        alert("ไม่พบข้อมูลเจ้าหน้าที่ กรุณาล็อกอินใหม่");
        window.location.href = '/staff_login';
        return;
    }

    isCreatingOrder = true;

    try {
        const response = await fetch('/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hn, staff_id: staffId })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = `/patient_info?order_id=${result.order_id}`;
        } else {
            alert("เกิดข้อผิดพลาด: " + result.message);
        }
    } catch (err) {
        console.error("Error:", err);
        alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
    } finally {
        isCreatingOrder = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    const logoutBtn = document.querySelector('.icon-logout');

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            tableRows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
                window.location.href = '/staff_login';
            }
        });
    }
});