// js/main.js
document.addEventListener('DOMContentLoaded', () => {

    // Menú Móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
            menuToggle.classList.toggle('active');
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = mainNav.classList.contains('mobile-active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en un enlace (para navegación en la misma página o SPA feel)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('mobile-active')) {
                    mainNav.classList.remove('mobile-active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Animaciones al hacer scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Opcional: dejar de observar una vez animado
                    // observer.unobserve(entry.target); 
                } else {
                    // Opcional: remover para re-animar si se sale y vuelve a entrar
                    // entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.1 // El 10% del elemento visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Actualizar año en el footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Active link en navegación (si es necesario para páginas múltiples)
    // Esto es un ejemplo básico y puede necesitar ajustes según tu estructura
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.main-nav a.nav-link');
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Asegurarse que otros no estén activos incorrectamente
        }
    });
    // Si la página de inicio es index.html y estás en ella, activa "Quién Soy"
    if (currentLocation.endsWith('index.html') || currentLocation.endsWith('/')) {
        const homeLink = document.querySelector('.main-nav a[href="index.html"]');
        if (homeLink) {
             // Primero quitar active de todos los demás
            navLinks.forEach(l => l.classList.remove('active'));
            homeLink.classList.add('active');
        }
    }


});