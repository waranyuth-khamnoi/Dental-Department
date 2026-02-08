document.addEventListener('DOMContentLoaded', () => {
    const examForm = document.querySelector('form');
    const logoutBtn = document.querySelector('.icon-logout');

    if (normalStatusCheckbox) {
        normalStatusCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                toothStatusCheckboxes.forEach(cb => {
                    if (cb !== normalStatusCheckbox) cb.checked = false;
                });
            }
        });

        toothStatusCheckboxes.forEach(cb => {
            if (cb !== normalStatusCheckbox) {
                cb.addEventListener('change', (e) => {
                    if (e.target.checked) normalStatusCheckbox.checked = false;
                });
            }
        });
    }

    // 2. ระบบ Logout
    if (logoutBtn) {
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.addEventListener('click', () => {
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }

    // 3. ระบบการส่งฟอร์ม (Form Submission)
    examForm.addEventListener('submit', (e) => {
        e.preventDefault(); // ป้องกันการรีโหลดหน้าจอ

        // รวบรวมข้อมูลจากฟอร์ม
        const formData = {
            toothStatus: Array.from(toothStatusCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.parentElement.innerText.trim()),
            remainingTeeth: document.querySelector('.short-input').value,
            occlusion: document.querySelector('input[name="occlusion"]:checked')?.parentElement.innerText.trim() || 'ไม่ได้ระบุ',
            gumCondition: document.querySelector('input[name="gum"]:checked')?.parentElement.innerText.trim() || 'ไม่ได้ระบุ',
            calculus: document.querySelector('input[name="calculus"]:checked')?.parentElement.innerText.trim() || 'ไม่ได้ระบุ',
            tmj: document.querySelector('input[name="tmj"]:checked')?.parentElement.innerText.trim() || 'ไม่ได้ระบุ'
        };

        console.log('ข้อมูลผลการตรวจช่องปากที่บันทึก:', formData);
        
        // แสดงข้อความสำเร็จและเปลี่ยนหน้า
        alert('บันทึกผลการตรวจเรียบร้อยแล้ว');
        window.location.href = '/registration';
    });
});