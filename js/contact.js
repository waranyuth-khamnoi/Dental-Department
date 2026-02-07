document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. จัดการ Sticky Header & Active Link ---
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // เพิ่มเงาให้ Header เมื่อเลื่อนจอลงมา
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            header.style.padding = '10px 0'; // ทำให้ Header แคบลงเล็กน้อยเวลา Scroll
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '15px 0';
        }
    });

    // --- 2. Contact Page: Map Interaction & Smooth Appearance ---
    // ตรวจสอบว่าเป็นหน้า Contact หรือไม่
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        const infoItems = document.querySelectorAll('.info-item');
        
        // เพิ่ม Animation ค่อยๆ โผล่ให้รายการติดต่อ
        infoItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 * (index + 1));
        });

        // ฟังก์ชันช่วยกดเบอร์โทรศัพท์ (สำหรับ Mobile)
        const phoneInfo = infoItems[1]; // อ้างอิงจากลำดับเบอร์โทรศัพท์
        if (phoneInfo) {
            phoneInfo.style.cursor = 'pointer';
            phoneInfo.addEventListener('click', () => {
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                    window.location.href = 'tel:054409500';
                }
            });
        }
    }

    // --- 3. Global: Mobile Menu Toggle (สำหรับ Responsive) ---
    // สร้างปุ่ม Menu สำหรับมือถือแบบ Dynamic (ถ้ายังไม่มีใน HTML)
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        const headerContainer = document.querySelector('.header-container');
        
        const menuBtn = document.createElement('button');
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = 'background:none; border:none; font-size:24px; cursor:pointer; order: 2;';
        
        headerContainer.appendChild(menuBtn);
        
        menuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.width = '100%';
            navMenu.style.textAlign = 'center';
        });
    }

    // --- 4. Hero Section: Image Parallax Effect ---
    // เพิ่มลูกเล่นให้รูปภาพขยับตามเมาส์เล็กน้อย (หน้า Main)
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});