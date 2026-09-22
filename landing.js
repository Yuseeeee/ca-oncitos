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

    const navLinks = document.querySelectorAll('.nav-links a');
    const esPaginaCatalogo = window.location.pathname.includes('catalogo.html');

    if (esPaginaCatalogo) {
        navLinks.forEach((enlace) => {
            const href = enlace.getAttribute('href');
            if (href === 'catalogo.html') {
                enlace.classList.add('active');
            } else {
                enlace.classList.remove('active');
            }
        });
    } else {
        const sections = document.querySelectorAll('header.hero, section[id], footer[id]');
        const navbar = document.querySelector('.navbar');

        function resaltarEnlaceActivo() {
            const altoNavbar = navbar ? navbar.offsetHeight : 0;
            const posicionScroll = window.scrollY;
            const altoTotalPagina = document.documentElement.scrollHeight;
            const altoVentana = window.innerHeight;

            let seccionActivaId = '';

            sections.forEach((seccion) => {
                const rect = seccion.getBoundingClientRect();
                const idSeccion = seccion.getAttribute('id') || '';

                if (rect.top <= altoNavbar + 120 && rect.bottom >= altoNavbar + 60) {
                    seccionActivaId = idSeccion;
                }
            });

            const alFinalDePagina = (altoVentana + posicionScroll) >= (altoTotalPagina - 10);
            if (alFinalDePagina) {
                const footer = document.getElementById('contacto');
                if (footer) {
                    const rectFooter = footer.getBoundingClientRect();
                    if (rectFooter.top <= altoVentana * 0.65) {
                        seccionActivaId = 'contacto';
                    }
                }
            }

            if (!seccionActivaId && posicionScroll < 150) {
                seccionActivaId = '#';
            }

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

        window.addEventListener('scroll', resaltarEnlaceActivo);
        resaltarEnlaceActivo();
    }

    const elementosARevelar = document.querySelectorAll('.reveal');

    if (elementosARevelar.length > 0) {
        const opciones = {
            root: null,       
            threshold: 0.15   
        };

        const observador = new IntersectionObserver((entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visible');
                    observer.unobserve(entrada.target);
                }
            });
        }, opciones);

        elementosARevelar.forEach((elemento) => {
            observador.observe(elemento);
        });
    }

});