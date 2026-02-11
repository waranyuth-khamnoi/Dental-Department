document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input');
    const tableRows = document.querySelectorAll('.staff-table tbody tr');

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        tableRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            
            if (rowText.includes(searchTerm)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

    tableRows.forEach(row => {
        if (!row.getAttribute('onclick')) {
            row.style.cursor = 'pointer';
            row.addEventListener('click', () => {
                const staffId = row.cells[0].textContent;
                window.location.href = `/staff_info?id=${staffId}`;
            });
        }
    });

    const logoutBtn = document.querySelectorAll('.icon-btn')[1];
    logoutBtn.addEventListener('click', () => {
        if (confirm('ยืนยันการออกจากระบบ?')) {
            console.log('Logging out...');
            window.location.href = '/staff_login';
        }
    });
});