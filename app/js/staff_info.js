document.addEventListener('DOMContentLoaded', () => {
    const getStaffDataFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const staffId = urlParams.get('id');

        if (staffId) {
            document.querySelector('.input-small').value = staffId;
            console.log("กำลังแสดงข้อมูลของรหัสพนักงาน:", staffId);
        }
    };

    const setupFormValidation = () => {
        const citizenIdInput = document.querySelector('input[value="1479832340"]'); // ช่องเลขบัตร
        const phoneInput = document.querySelector('input[value="0537216322"]');    // ช่องเบอร์โทร

        [citizenIdInput, phoneInput].forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        });
    };

    let isDirty = false;
    const formInputs = document.querySelectorAll('input');
    formInputs.forEach(input => {
        input.addEventListener('change', () => isDirty = true);
    });

    getStaffDataFromURL();
    setupFormValidation();

    const logoutBtn = document.querySelectorAll('.icon-btn')[1];
    logoutBtn.addEventListener('click', () => {
        if (confirm('ยืนยันการออกจากระบบ?')) {
            console.log('Logging out...');
            window.location.href = '/staff_login';
        }
    });
});