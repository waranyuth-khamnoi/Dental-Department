document.addEventListener('DOMContentLoaded', () => {
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

    staffCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);

    const staffNames = document.querySelectorAll('.staff-info h3');
    staffNames.forEach(name => {
        name.addEventListener('mouseenter', () => {
            name.style.color = '#e0b838';
            name.style.transition = 'color 0.3s';
        });
        name.addEventListener('mouseleave', () => {
            name.style.color = '#1a1a1a';
        });
    });

    const staffImages = document.querySelectorAll('.staff-img');
    staffImages.forEach(img => {
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/280x350?text=Dentist+Image';
        };
    });
});