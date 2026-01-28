// จำลองข้อมูลจาก Mockup
const appointments = [
    {
        id: 1,
        time: "07:45",
        room: "ทันตกรรม",
        name: "ม่อนจุ๊กกุ๊ก อิอิ",
        treatment: "ผ่าฟันคุด",
        diagnosis: "ฟันเอียงชน",
        payment: "ชำระเงินสด"
    },
    {
        id: 2,
        time: "08:00",
        room: "ทันตกรรม",
        name: "นากาซาโกะ อุอิ",
        treatment: "ขูดหินปูน",
        diagnosis: "หินปูนสะสม",
        payment: "ชำระเงินสด"
    }
];

function renderTable() {
    const tableBody = document.getElementById('appointment-table');
    tableBody.innerHTML = '';

    appointments.forEach(item => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.time}</td>
                <td>${item.room}</td>
                <td>${item.name}</td>
                <td>${item.treatment}</td>
                <td>${item.diagnosis}</td>
                <td>${item.payment}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', renderTable);

document.addEventListener('DOMContentLoaded', () => {
    // ฟังก์ชันสำหรับจัดการการคลิกที่เมนู
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        card.addEventListener('click', (e) => {
            console.log('กำลังไปที่หน้า: ' + e.target.innerText);
        });
    });

    // ฟังก์ชัน Logout เบื้องต้น
    const logoutBtn = document.querySelector('button[aria-label="Logout"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
                window.location.href = 'signin_choice.html';
            }
        });
    }
});