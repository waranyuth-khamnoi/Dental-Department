document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const btnCancel = document.querySelector('.btn-cancel');
    const btnConfirm = document.querySelector('.btn-confirm');

    form.addEventListener('submit', (e) => {
        const isConfirmed = confirm('ยืนยันการบันทึกข้อมูลบุคลากรใหม่ใช่หรือไม่?');
        
        if (!isConfirmed) {
            e.preventDefault();
        }
    });

    btnCancel.addEventListener('click', () => {
        if (confirm('คุณต้องการยกเลิกการเพิ่มข้อมูลและกลับสู่หน้าก่อนหน้าใช่หรือไม่? ข้อมูลที่กรอกไว้จะหายไป')) {
            window.location.href = '/staff_manage';
        }
    });
    const numericInputs = ['staff_id', 'id_card', 'phone'];
    numericInputs.forEach(name => {
        const input = document.querySelector(`input[name="${name}"]`);
        if (input) {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }
    });

    const logoutBtn = document.querySelectorAll('.user-actions .icon-btn')[1];
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("ยืนยันการออกจากระบบ?")) {
                window.location.href = '/staff_login';
            }
        });
    }
});

