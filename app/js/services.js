document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease out`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3').innerText;
            
            console.log(`คุณเลือกบริการ: ${serviceName}`);

        });
    });

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