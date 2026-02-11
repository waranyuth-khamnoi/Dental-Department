document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.patient-table tbody tr');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    const actionButtons = document.querySelectorAll('.icon-btn');
    
    actionButtons[1].addEventListener('click', () => {
        if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
            window.location.href = '/staff_login'; 
        }
    });

    tableRows.forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            const orderId = row.getAttribute('data-orderid');
            if (orderId) {
                window.location.href = `/patient_info_h?order_id=${orderId}`;
            }
        });
    });
});
