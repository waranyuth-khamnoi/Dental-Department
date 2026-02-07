document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Staggered Reveal Animation ---
    // ทำให้การ์ดบริการค่อยๆ ทยอยโผล่ขึ้นมาทีละใบเมื่อโหลดหน้า
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // ตั้งค่าเริ่มต้น
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease out`;
        
        // ใช้ setTimeout เพื่อสร้างจังหวะหน่วง (Stagger)
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index); // ทยอยแสดงห่างกันใบละ 0.1 วินาที
    });

    // --- 2. Interactive Click Effect ---
    // เพิ่มลูกเล่นเมื่อกดที่การ์ด (เช่น แสดง Alert หรือเตรียมเปิด Modal ในอนาคต)
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3').innerText;
            
            // ตัวอย่าง: ถ้าต้องการให้แสดงข้อความเมื่อคลิก
            console.log(`คุณเลือกบริการ: ${serviceName}`);
            
            // คุณสามารถเปลี่ยนเป็นเปิดหน้าจองคิว หรือเปิดหน้าต่างรายละเอียดได้ที่นี่
            // alert(`กำลังนำคุณไปยังหน้ารายละเอียดของ: ${serviceName}`);
        });
    });

    // --- 3. Image Hover Shake ---
    // เพิ่มลูกเล่นให้ไอคอนขยับเล็กน้อยเมื่อเอาเมาส์วาง
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon-bg img');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});