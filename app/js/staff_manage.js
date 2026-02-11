document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input');
    const tableRows = document.querySelectorAll('.staff-table tbody tr');

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        tableRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchTerm) ? "" : "none";
        });
    });

    const deleteButtons = document.querySelectorAll('.action-btn.delete');

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', async function() {
            const row = this.closest('tr');
            const staffName = row.cells[1].textContent + " " + row.cells[2].textContent;
            const staffId = this.getAttribute('data-id');

            if (confirm(`คุณต้องการลบข้อมูลของ "${staffName}" (รหัส: ${staffId}) ใช่หรือไม่?`)) {
                try {
                    const response = await fetch(`/api/staff_delete/${staffId}`, {
                        method: 'DELETE'
                    });

                    const result = await response.json();

                    if (result.success) {
                        row.style.transition = "opacity 0.3s ease";
                        row.style.opacity = "0";
                        setTimeout(() => {
                            row.remove();
                            alert(result.message);
                        }, 300);
                    } else {
                        alert(result.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
                }
            }
        });
    });

    const logoutBtn = document.querySelectorAll('.user-actions .icon-btn')[1];
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("ยืนยันการออกจากระบบ?")) {
                window.location.href = '/staff_login';
            }
        });
    }

    const editButtons = document.querySelectorAll('.action-btn.edit');
    editButtons.forEach(btn => {
        if (btn.tagName === 'BUTTON') {
            btn.addEventListener('click', function() {
                const staffId = this.closest('tr').cells[0].textContent;
                window.location.href = `/staff_edit?id=${staffId}`;
            });
        }
    });
});