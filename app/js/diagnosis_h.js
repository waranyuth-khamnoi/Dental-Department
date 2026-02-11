document.addEventListener('DOMContentLoaded', () => {
    // --- ส่วนที่ 1: ระบบ Logout (ทำให้กดได้แน่นอน) ---
    const logoutBtn = document.querySelector('.icon-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); // ป้องกันการทำงานซ้อนทับ
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }

    // --- ส่วนที่ 2: ดึงข้อมูลหัตถการมาติ๊ก (Checked) ---
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');

    if (orderId) {
        fetch(`/api/diagnosis-data/${orderId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const mapping = {
                        p1: data.prevent,
                        p2: data.re_dentistry,
                        p3: data.oral_sur,
                        p4: data.root_treatment,
                        p5: data.endodontics,
                        p6: data.gp_disease
                    };

                    Object.keys(mapping).forEach(name => {
                        const val = mapping[name];
                        if (val && val !== 'N') {
                            // หา radio ที่ตรงทั้งชื่อกลุ่ม (name) และค่า (value)
                            const radio = document.querySelector(`input[name="${name}"][value="${val}"]`);
                            if (radio) {
                                radio.checked = true;
                                radio.dataset.wasChecked = "true"; // เก็บสถานะไว้
                            }
                        }
                    });
                }
            })
            .catch(err => console.error("Error loading data:", err));
    }

    // --- ส่วนที่ 3: ระบบ Toggle Radio (กดแล้วเลือก/ยกเลิกได้) ---

});