document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. จัดการ Sticky Header ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // --- 2. Smooth Scroll สำหรับลิงก์ภายใน ---
    // (ถ้ามีปุ่มที่กดแล้วเลื่อนลงไปดูข้อมูลด้านล่าง)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 3. Animation เบื้องต้นเมื่อโหลดหน้าเว็บ (Reveal Effect) ---
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-30px)';
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';

            heroImage.style.transition = 'all 0.8s ease-out';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 200);
    }

    // --- 4. จัดการปุ่มโทร (Mobile Optimization) ---
    // ถ้าดูผ่านมือถือ เมื่อกดปุ่ม 'โทรติดต่อ' จะเด้งไปหน้าโทรศัพท์ทันที
    const phoneBtn = document.querySelector('.btn-blue');
    if (phoneBtn && /Mobi|Android/i.test(navigator.userAgent)) {
        phoneBtn.href = 'tel:054409500';
    }
});