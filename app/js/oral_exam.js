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
    e.preventDefault();

    // 1. ดึง order_id จาก URL (เช่น ?hn=...&order_id=5)
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');

    // 2. รวบรวมข้อมูล พร้อมใส่ order_id ลงไป
    const formData = {
        order_id: orderId, // เพิ่มฟิลด์นี้
        toothStatus: Array.from(toothStatusCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.parentElement.innerText.trim()),
        remainingTeeth: document.querySelector('.short-input').value,
        occlusion: document.querySelector('input[name="occlusion"]:checked')?.parentElement.innerText.trim() || 'ไม่ได้ระบุ',
        gumCondition: document.querySelector('input[name="gum"]:checked')?.parentElement.innerText.trim() || 'ไม่ได้ระบุ',
        calculus: document.querySelector('input[name="calculus"]:checked')?.parentElement.innerText.trim() || 'ไม่ได้ระบุ',
        tmj: document.querySelector('input[name="tmj"]:checked')?.parentElement.innerText.trim() || 'ไม่ได้ระบุ'
    };

    // 3. ยิง fetch ไปบันทึก (สมมติว่าสร้าง Route /save-oral-exam ไว้)
    fetch('/save-oral-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(() => {
        alert('บันทึกผลการตรวจเรียบร้อย');
    });
});
});