document.addEventListener('DOMContentLoaded', () => {
    // Handle Disease "Yes" radio logic
    const diseaseRadios = document.querySelectorAll('input[name="disease"]');
    const diseaseInput = diseaseRadios[0].parentElement.parentElement.querySelector('.inline-input');

    diseaseRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'มี') {
                diseaseInput.disabled = false;
                diseaseInput.focus();
            } else {
                diseaseInput.disabled = true;
                diseaseInput.value = '';
            }
        });
    });

    // Handle Allergy "Yes" radio logic
    const allergyRadios = document.querySelectorAll('input[name="allergy"]');
    const allergyInput = allergyRadios[0].parentElement.parentElement.querySelector('.inline-input');

    allergyRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'มี') {
                allergyInput.disabled = false;
                allergyInput.focus();
            } else {
                allergyInput.disabled = true;
                allergyInput.value = '';
            }
        });
    });

    // Handle Form Submission
    const form = document.getElementById('bookingForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('บันทึกข้อมูลการจองเรียบร้อย (Demo)');
    });
});
