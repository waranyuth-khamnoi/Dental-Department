document.addEventListener('DOMContentLoaded', () => {

    // เอฟเฟกต์ Fade-in ตอนโหลดหน้า
    const grid = document.querySelector('.services-grid');
    grid.style.opacity = '0';
    grid.style.transition = 'opacity 0.8s ease-in';
    
    setTimeout(() => {
        grid.style.opacity = '1';
    }, 100);
});