document.addEventListener('DOMContentLoaded', () => {
    // 1. ฟังก์ชัน Scroll Reveal: ให้การ์ดค่อยๆ เลื่อนขึ้นเมื่อ Scroll มาถึง
    const staffCards = document.querySelectorAll('.staff-card');
    
    const revealOnScroll = () => {
        staffCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.85; // เริ่มแสดงเมื่อเลื่อนมาถึง 85% ของจอ

            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // ตั้งค่าเริ่มต้นก่อนเริ่ม Animation
    staffCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    // เรียกใช้งานเมื่อมีการ Scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // เรียกใช้ครั้งแรกเพื่อเช็คตำแหน่งปัจจุบัน

    // 2. ตัวอย่างการดึงข้อมูลจาก API (ถ้าในอนาคตคุณมีฐานข้อมูลหมอ)
    // สำหรับตอนนี้เราจะทำ Log เล็กๆ เมื่อคลิกที่รูปหมอ
    staffCards.forEach(card => {
        card.addEventListener('click', () => {
            const doctorName = card.querySelector('h3').innerText;
            console.log(`คุณกำลังดูข้อมูลของ: ${doctorName}`);
            // ตัวอย่าง: อาจจะเปิด Modal แสดงประวัติการศึกษาเพิ่มเติมที่นี่
        });
    });
});