document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.icon-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = '/staff_login';
            }
        });
    }

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
                            const radio = document.querySelector(`input[name="${name}"][value="${val}"]`);
                            if (radio) {
                                radio.checked = true;
                                radio.dataset.wasChecked = "true";
                            }
                        }
                    });
                }
            })
            .catch(err => console.error("Error loading data:", err));
    }
});