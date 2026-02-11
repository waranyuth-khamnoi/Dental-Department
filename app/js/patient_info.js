document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.icon-logout');
    const diseaseRadios = document.querySelectorAll('input[name="disease"]');
    const allergyRadios = document.querySelectorAll('input[name="allergy"]');
    const idCardInput = document.querySelector('input[placeholder*="13 หลัก"]');

    const toggleExtraInput = (radios) => {
        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const extraInput = e.target.closest('.radio-inline').querySelector('.inline-input');
                if (extraInput) {
                    if (e.target.parentElement.innerText.includes('มี')) {
                        extraInput.disabled = false;
                        extraInput.focus();
                    } else {
                        extraInput.disabled = true;
                        extraInput.value = '';
                    }
                }
            });
        });
    };

    toggleExtraInput(diseaseRadios);
    toggleExtraInput(allergyRadios);

    if (idCardInput) {
        idCardInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            if (e.target.value.length > 13) {
                e.target.value = e.target.value.slice(0, 13);
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

    const savePatientData = () => {
        const patientData = {
            firstName: document.querySelector('input[value="ม่อนจุ๊กกุ๊ก"]').value,
            lastName: document.querySelector('input[value="อิอิ"]').value,
            idCard: idCardInput.value,
        };
        console.log('กำลังบันทึกข้อมูลผู้ป่วย:', patientData);
        alert('บันทึกข้อมูลสำเร็จ');
    };
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