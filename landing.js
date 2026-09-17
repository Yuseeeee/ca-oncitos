document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del formulario de newsletter
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

    // 2. Cambio automático de enlace activo según visibilidad en pantalla (Scrollspy)
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('header.hero, section[id], footer[id]');
    const navbar = document.querySelector('.navbar');

    function resaltarEnlaceActivo() {
        const altoNavbar = navbar ? navbar.offsetHeight : 0;
        const posicionScroll = window.scrollY;
        const altoTotalPagina = document.documentElement.scrollHeight;
        const altoVentana = window.innerHeight;

        let seccionActivaId = '';

        // Recorremos las secciones y evaluamos su posición dentro del área visible
        sections.forEach((seccion) => {
            const rect = seccion.getBoundingClientRect();
            const idSeccion = seccion.getAttribute('id') || '';

            // La sección se activa si su borde superior entra al área de lectura
            // y su parte inferior aún sigue dentro de la pantalla
            if (rect.top <= altoNavbar + 120 && rect.bottom >= altoNavbar + 60) {
                seccionActivaId = idSeccion;
            }
        });

        // Evaluación especial del final de página:
        const alFinalDePagina = (altoVentana + posicionScroll) >= (altoTotalPagina - 10);
        if (alFinalDePagina) {
            const footer = document.getElementById('contacto');
            if (footer) {
                const rectFooter = footer.getBoundingClientRect();
                // Solo activa "Contacto" si el pie de página ya subió lo suficiente en pantalla
                if (rectFooter.top <= altoVentana * 0.65) {
                    seccionActivaId = 'contacto';
                }
            }
        }

        // Si la pantalla está arriba de todo en la cabecera
        if (!seccionActivaId && posicionScroll < 150) {
            seccionActivaId = '#';
        }

        // Asignamos la clase active al enlace correspondiente
        navLinks.forEach((enlace) => {
            enlace.classList.remove('active');
            const destinoHref = enlace.getAttribute('href');

            if (
                (destinoHref === '#' && seccionActivaId === '#') ||
                (destinoHref === `#${seccionActivaId}`)
            ) {
                enlace.classList.add('active');
            }
        });
    }

    // Escuchar el evento de desplazamiento y ejecutar al cargar
    window.addEventListener('scroll', resaltarEnlaceActivo);
    resaltarEnlaceActivo();
});