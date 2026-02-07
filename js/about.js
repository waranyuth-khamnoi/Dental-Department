document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Scroll Reveal Animation ---
    // ทำให้การ์ดทันตแพทย์ค่อยๆ โผล่ขึ้นมาเมื่อเลื่อนจอมาถึง
    const staffCards = document.querySelectorAll('.staff-card');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        staffCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // ตั้งค่าเริ่มต้นให้การ์ดซ่อนอยู่ก่อน
    staffCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // เรียกใช้ทันทีหนึ่งครั้งเพื่อเช็คการ์ดที่อยู่ด้านบนสุด


    // --- 2. Hover Effect เพิ่มเติม (ทางเลือก) ---
    // เพิ่มการโต้ตอบเมื่อนำเมาส์ไปวางที่ชื่อทันตแพทย์
    const staffNames = document.querySelectorAll('.staff-info h3');
    staffNames.forEach(name => {
        name.addEventListener('mouseenter', () => {
            name.style.color = '#e0b838'; // เปลี่ยนเป็นสีทองเหลืองตามธีม
            name.style.transition = 'color 0.3s';
        });
        name.addEventListener('mouseleave', () => {
            name.style.color = '#1a1a1a';
        });
    });

    // --- 3. ตรวจสอบรูปภาพ ---
    // หากรูปภาพโหลดไม่ขึ้น ให้แสดง Placeholder แทน
    const staffImages = document.querySelectorAll('.staff-img');
    staffImages.forEach(img => {
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/280x350?text=Dentist+Image';
        };
    });
});