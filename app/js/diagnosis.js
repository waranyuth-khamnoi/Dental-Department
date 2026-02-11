
document.addEventListener('DOMContentLoaded', () => {
    const diagnosisForm = document.getElementById('diagnosisForm');
    const logoutBtn = document.querySelector('.icon-logout');
    const urlParams = new URLSearchParams(window.location.search);

    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.addEventListener('click', function() {
            if (this.wasChecked) {
                this.checked = false;
                this.wasChecked = false;
            } else {
                const groupName = this.getAttribute('name');
                document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => r.wasChecked = false);
                this.wasChecked = true;
            }
        });
    });

    if (diagnosisForm) {
        diagnosisForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(diagnosisForm);
            
            const data = {
                order_id: urlParams.get('order_id'),
                hn: urlParams.get('hn'),
                prevent: formData.get('p1') || 'N',
                re_dentistry: formData.get('p2') || 'N',
                oral_sur: formData.get('p3') || 'N',
                root_treatment: formData.get('p4') || 'N',
                endodontics: formData.get('p5') || 'N',
                gp_disease: formData.get('p6') || 'N'
            };

            const hasSelection = Object.values(data).some(val => val !== 'N' && val !== null && val !== data.order_id && val !== data.hn);
            if (!hasSelection) {
                alert('กรุณาเลือกรายการหัตถการอย่างน้อย 1 รายการ');
                return;
            }

            try {
                const response = await fetch('/diagnosis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('บันทึกข้อมูลหัตถการเรียบร้อยแล้ว');
                    window.location.href = '/registration';
                } else {
                    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.addEventListener('click', () => {
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }
});

document.addEventListener('click', async (e) => {
    const target = e.target.closest('.nav-admin-link, .btn-cancel-order');
    if (target) {
        const isRegis = target.pathname === '/registration' || target.getAttribute('href') === '/registration';
        if (isRegis) {
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get('order_id');
            if (orderId) {
                e.preventDefault();
                if (confirm('คุณต้องการยกเลิกคิวงานนี้และกลับไปหน้าทะเบียนใช่หรือไม่?')) {
                    try {
                        const response = await fetch(`/delete-order/${orderId}`, { method: 'DELETE' });
                        window.location.href = '/registration';
                    } catch (err) {
                        window.location.href = '/registration';
                    }
                }
            }
        }
    }
});