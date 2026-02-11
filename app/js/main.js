document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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
    
    const phoneBtn = document.querySelector('.btn-blue');
    if (phoneBtn && /Mobi|Android/i.test(navigator.userAgent)) {
        phoneBtn.href = 'tel:054409500';
    }
});