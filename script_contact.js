document.addEventListener('DOMContentLoaded', () => {
    // เอฟเฟกต์ Fade-in สำหรับข้อมูลการติดต่อ
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease out ${index * 0.1}s`;

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100);
    });
});