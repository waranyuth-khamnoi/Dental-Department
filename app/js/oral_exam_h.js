document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.icon-logout');

    if (logoutBtn) {
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.addEventListener('click', () => {
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }
});