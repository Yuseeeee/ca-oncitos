document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailValue = newsletterEmail.value.trim();

            if (emailValue) {
                alert(`¡Gracias por suscribirte con el correo: ${emailValue}! Te enviaremos novedades pronto.`);
                newsletterForm.reset();
            }
        });
    }
});