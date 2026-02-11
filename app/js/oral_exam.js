document.addEventListener('DOMContentLoaded', () => {
    const examForm = document.getElementById('oral_exam');
    const logoutBtn = document.querySelector('.icon-logout');
    
    const normalStatusCheckbox = document.getElementById('normalStatus');
    const toothStatusCheckboxes = document.querySelectorAll('input[name="t_decay"], input[name="t_worn"], input[name="t_broken"], input[name="t_miss"], input[name="t_fill"], input[name="t_wisdom"], input[name="t_misali"]');

    if (normalStatusCheckbox) {
        normalStatusCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                toothStatusCheckboxes.forEach(cb => cb.checked = false);
            }
        });

        toothStatusCheckboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                if (e.target.checked) normalStatusCheckbox.checked = false;
            });
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

    if (examForm) {
        examForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get('order_id'); 
            const hn = urlParams.get('hn');

            if (!orderId) {
                alert('ไม่พบรหัสใบสั่งงาน (Order ID)');
                return;
            }

            const formData = new FormData(examForm);
            
            const data = {
                order_id: orderId,
                t_unfill_cavities: formData.get('t_unfill_cavities') || 0,
            };

            const checkFields = [
                't_decay', 't_worn', 't_broken', 't_miss', 't_fill', 
                't_wisdom', 't_misali', 't_normal', 'normal_occ', 
                'deep_bite', 'overlap', 'inflamed', 't_loose', 
                'bleed', 'plaque', 'plaque_above', 'plaque_under', 
                'jawpian', 'clicking', 'limit_open'
            ];

            checkFields.forEach(f => {
                data[f] = formData.get(f) === 'Y' ? 'Y' : 'N';
            });

            try {
                const response = await fetch('/oral_exam', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if (result.success) {
                    alert('บันทึกข้อมูลเรียบร้อย');
                    window.location.href = `/diagnosis?hn=${hn}&order_id=${orderId}`;
                } else {
                    alert('บันทึกไม่สำเร็จ: ' + (result.message || 'Unknown Error'));
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
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
                        const response = await fetch(`/delete-order/${orderId}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            window.location.href = '/registration';
                        } else {
                            window.location.href = '/registration';
                        }
                    } catch (err) {
                        window.location.href = '/registration';
                    }
                }
            }
        }
    }
});